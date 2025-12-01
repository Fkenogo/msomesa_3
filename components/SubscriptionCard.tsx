import React from 'react';
import Card from './Card';
import { User } from '../types';
import { SparklesIcon } from './icons';

interface SubscriptionCardProps {
  currentUser: User;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ currentUser }) => {
  const { subscription } = currentUser;

  if (!subscription) {
    return (
      <Card>
        <h2 className="text-xl font-bold text-gray-800">Subscription</h2>
        <p className="text-gray-500 mt-2">No subscription information available.</p>
      </Card>
    );
  }

  const { plan, billingHistory } = subscription;

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Subscription Status</h2>
          <p className={`text-3xl font-bold mt-1 ${plan === 'Premium' ? 'text-sky-600' : 'text-gray-600'}`}>{plan} Plan</p>
        </div>
        <SparklesIcon className={`w-8 h-8 ${plan === 'Premium' ? 'text-amber-400' : 'text-gray-300'}`} />
      </div>

      {plan === 'Free' ? (
        <button className="mt-4 w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform">
          Upgrade to Premium
        </button>
      ) : (
        <button className="mt-4 w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">
          Manage Subscription
        </button>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Billing History</h3>
        {billingHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase">
                <tr>
                  <th className="py-2">Date</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {billingHistory.map(item => (
                  <tr key={item.id}>
                    <td className="py-2">{item.date}</td>
                    <td className="py-2">UGX {item.amount.toLocaleString()}</td>
                    <td className="py-2">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center bg-gray-50 p-4 rounded-lg">No billing history found.</p>
        )}
      </div>
    </Card>
  );
};

export default SubscriptionCard;