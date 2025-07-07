"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiMail, FiUser, FiCalendar, FiChevronLeft, FiChevronRight, FiX, FiCheck } from "react-icons/fi";

interface FormSubmission {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  submitted_at: string;
  ip_address: string | null;
  is_read: number;
}

interface PaginationData {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const fetchSubmissions = async () => {
    if (!adminKey) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(`/api/get-submissions?key=${encodeURIComponent(adminKey)}&page=${pagination.page}&limit=${pagination.limit}`);
      const data = await response.json();
      
      if (data.success) {
        setSubmissions(data.data.submissions);
        setPagination(data.data.pagination);
        setIsAuthenticated(true);
      } else {
        setError(data.error || "获取数据失败");
        if (response.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      setError("获取数据时发生错误");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [pagination.page, isAuthenticated]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubmissions();
  };
  
  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination({...pagination, page: pagination.page - 1});
    }
  };
  
  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination({...pagination, page: pagination.page + 1});
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">管理后台</h1>
            <p className="text-xl text-gray-300">
              查看和管理提交的表单信息
            </p>
          </div>
          
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto">
              <div className="bg-gray-800 rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="adminKey" className="block text-sm font-medium text-gray-300 mb-1">
                      管理密钥
                    </label>
                    <input
                      type="password"
                      id="adminKey"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  {error && (
                    <div className="bg-red-900/30 border border-red-500 rounded-md p-3">
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "验证中..." : "访问管理后台"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              {submissions.length > 0 ? (
                <div className="space-y-6">
                  {/* 数据表格 */}
                  <div className="bg-gray-800 overflow-hidden rounded-lg">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              姓名
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              邮箱
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              主题
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              提交时间
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              状态
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {submissions.map((submission) => (
                            <tr key={submission.id} className="hover:bg-gray-750">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {submission.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                <div className="flex items-center">
                                  <FiUser className="mr-2 text-gray-400" />
                                  {submission.name}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                <div className="flex items-center">
                                  <FiMail className="mr-2 text-gray-400" />
                                  {submission.email}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {submission.subject || '(无主题)'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                <div className="flex items-center">
                                  <FiCalendar className="mr-2 text-gray-400" />
                                  {formatDate(submission.submitted_at)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {submission.is_read ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">
                                    <FiCheck className="mr-1" /> 已读
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900 text-blue-300">
                                    新消息
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* 分页 */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      共 {pagination.totalItems} 条记录，第 {pagination.page} 页 / 共 {pagination.totalPages} 页
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handlePrevPage}
                        disabled={pagination.page <= 1}
                        className={`px-3 py-2 rounded-md text-sm bg-gray-700 ${
                          pagination.page <= 1 ? "text-gray-500 cursor-not-allowed" : "text-white hover:bg-gray-600"
                        }`}
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={pagination.page >= pagination.totalPages}
                        className={`px-3 py-2 rounded-md text-sm bg-gray-700 ${
                          pagination.page >= pagination.totalPages ? "text-gray-500 cursor-not-allowed" : "text-white hover:bg-gray-600"
                        }`}
                      >
                        <FiChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-400">暂无表单提交数据</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 