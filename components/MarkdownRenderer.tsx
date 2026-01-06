import React from 'react';

// A helper function to parse inline styles like **bold** text.
const renderInlineFormatting = (line: string): React.ReactNode => {
    // Handle pre-formatted text for code/math blocks
    if (line.startsWith('<pre>') && line.endsWith('</pre>')) {
        return <pre className="font-mono bg-gray-100 p-2 rounded-md my-2 text-sm whitespace-pre-wrap">{line.slice(5, -5)}</pre>;
    }

    // Split by bold tags, keeping the bolded content in the array
    return line.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
       // Also handle single * for italics
      return part.split(/(\*.*?\*)/g).map((italicPart, i) => {
          if (italicPart.startsWith('*') && italicPart.endsWith('*')) {
              return <em key={`${index}-${i}`}>{italicPart.slice(1, -1)}</em>;
          }
          return italicPart;
      });
    });
};

const StepByStepRenderer: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');
    const introLines: string[] = [];
    const steps: { title: string; content: string[] }[] = [];
    let parsingIntro = true;

    lines.forEach(line => {
        const stepMatch = line.match(/^Step\s*\d+:\s*(.*)/i);
        if (stepMatch) {
            parsingIntro = false;
            steps.push({ title: stepMatch[1], content: [] });
        } else if (parsingIntro && line.trim()) {
            // Ignore the "Step-by-Step Explanation:" title
            if (!line.trim().toLowerCase().startsWith('step-by-step explanation')) {
                introLines.push(line.trim());
            }
        } else if (!parsingIntro && steps.length > 0) {
             if (line.trim()) { // Add non-empty lines
                // Check for preformatted code by looking for multiple leading spaces
                if (line.match(/^\s{3,}/)) {
                    steps[steps.length - 1].content.push(`<pre>${line.trim()}</pre>`);
                } else {
                    steps[steps.length - 1].content.push(line.trim());
                }
            } else if (steps[steps.length - 1].content.length > 0 && !steps[steps.length - 1].content[steps[steps.length - 1].content.length -1].startsWith('<pre>')) {
                 // Add a line break for empty lines between content, but not after preformatted blocks
                 steps[steps.length - 1].content.push('\n'); 
            }
        }
    });

    return (
        <div>
            {introLines.length > 0 && (
                <p className="mb-4 text-gray-600">{introLines.map(line => renderInlineFormatting(line)).reduce((prev, curr) => <>{prev}<br/>{curr}</>)}</p>
            )}
            <div className="space-y-3">
                {steps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-sky-50 rounded-lg border border-sky-200 shadow-sm">
                        <div className="flex-shrink-0 w-8 h-8 bg-sky-500 text-white font-bold rounded-full flex items-center justify-center mt-1 text-base">{i + 1}</div>
                        <div className="flex-grow">
                            <p className="font-bold text-sky-800 text-base">{renderInlineFormatting(step.title)}</p>
                            <div className="text-gray-700 mt-1 leading-relaxed">
                                {step.content.map((line, j) => {
                                    if (line === '\n') return <br key={j}/>;
                                    return <React.Fragment key={j}>{renderInlineFormatting(line)}</React.Fragment>;
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const OriginalMarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let ulistItems: string[] = [];
  let olistItems: string[] = [];
  let paragraphLines: string[] = [];

  const flushUList = () => {
    if (ulistItems.length > 0) {
      elements.push(
        <ul key={`ulist-${elements.length}`} className="list-disc pl-5 space-y-1">
          {ulistItems.map((item, i) => <li key={i}>{renderInlineFormatting(item)}</li>)}
        </ul>
      );
      ulistItems = [];
    }
  };

  const flushOList = () => {
    if (olistItems.length > 0) {
      elements.push(
        <ol key={`olist-${elements.length}`} className="list-decimal pl-5 space-y-2">
          {olistItems.map((item, i) => <li key={i}>{renderInlineFormatting(item)}</li>)}
        </ol>
      );
      olistItems = [];
    }
  };

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
        elements.push(
            <p key={`para-${elements.length}`}>
                {paragraphLines.map((line, i) => (
                    <React.Fragment key={i}>
                        {renderInlineFormatting(line)}
                        {i < paragraphLines.length - 1 && <br />}
                    </React.Fragment>
                ))}
            </p>
        );
        paragraphLines = [];
    }
  };

  const flushAll = () => {
    flushUList();
    flushOList();
    flushParagraph();
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('###')) {
      flushAll();
      elements.push(
        <h3 key={`h3-${elements.length}`}>
          {renderInlineFormatting(trimmedLine.replace(/^###\s*/, ''))}
        </h3>
      );
    } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
      flushOList();
      flushParagraph();
      ulistItems.push(trimmedLine.substring(2));
    } else if (trimmedLine.match(/^\d+\.\s/)) {
      flushUList();
      flushParagraph();
      olistItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
    } else if (trimmedLine.trim() === '---') {
      flushAll();
      elements.push(<hr key={`hr-${elements.length}`} />);
    } else if (trimmedLine.trim() === '') {
      flushAll();
    } else {
      flushUList();
      flushOList();
      paragraphLines.push(line);
    }
  });

  flushAll();

  // The `prose` class will handle styling for children elements.
  return <div className="prose max-w-none prose-sm sm:prose-base">{elements}</div>;
};


interface MarkdownRendererProps {
  text: string | null;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ text }) => {
  if (!text) {
    return null;
  }
  
  const trimmedText = text.trim();
  const isStepByStep = trimmedText.toLowerCase().includes('step-by-step') || trimmedText.match(/^Step\s*1:/im);

  if (isStepByStep) {
    return <StepByStepRenderer text={text} />;
  }
  
  return <OriginalMarkdownRenderer text={text} />;
};

export default MarkdownRenderer;