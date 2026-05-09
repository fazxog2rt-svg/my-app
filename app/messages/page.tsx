'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Messages() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchMessages();
    }
  }, [session]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toUserId: selectedUser,
          content: newMessage,
        }),
      });

      if (res.ok) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId }),
      });
      fetchMessages();
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            💬 Messages
          </h1>
          {unreadCount > 0 && (
            <span className="inline-block px-3 py-1 bg-red-600 text-white rounded-full text-sm font-bold">
              {unreadCount} unread
            </span>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
              {messages.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-2xl mb-4">No messages yet</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start a conversation with someone!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-slate-700">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      onClick={() => {
                        if (!msg.read && msg.toUserId === session?.user?.email) {
                          markAsRead(msg.id);
                        }
                        setSelectedUser(msg.fromUserId === session?.user?.email ? msg.toUserId : msg.fromUserId);
                      }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition ${
                        !msg.read && msg.toUserId === session?.user?.email
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {msg.fromUserId === session?.user?.email ? `To: ${msg.toUserId}` : msg.fromUserName}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 truncate">{msg.content}</p>
                      {!msg.read && msg.toUserId === session?.user?.email && (
                        <span className="inline-block mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                          New
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter user email..."
                value={selectedUser || ''}
                onChange={e => setSelectedUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />

              <textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
              />

              <button
                onClick={sendMessage}
                disabled={!selectedUser || !newMessage.trim()}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
              >
                Send Message
              </button>

              <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Demo contacts:
                </p>
                <div className="space-y-2">
                  {['admin@ulagan.com', 'support@ulagan.com'].map(email => (
                    <button
                      key={email}
                      onClick={() => setSelectedUser(email)}
                      className="block w-full text-left px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition text-gray-900 dark:text-white"
                    >
                      {email}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
