import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-14 md:h-18 lg:h-24">
          {/* 로고 */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logo/logo.png" 
              alt="CharacterSketch" 
              className="h-14 md:h-18 lg:h-24 w-auto mt-3"
            />
          </Link>

          {/* 네비게이션 메뉴 */}
          <div className="hidden md:flex items-center ml-14">
            <Link 
              to="/" 
              className={`px-8 py-3 rounded-none text-base md:text-lg lg:text-xl font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-[#16EF72] bg-black' 
                  : 'text-black hover:text-[#16EF72] hover:bg-white'
              }`}
              style={{ marginTop: '12%' }}
            >
              홈
            </Link>
            <Link 
              to="/visualize" 
              className={`px-8 py-3 rounded-none text-base md:text-lg lg:text-xl font-medium transition-colors duration-200 ${
                isActive('/visualize') 
                  ? 'text-[#16EF72] bg-black' 
                  : 'text-black hover:text-[#16EF72] hover:bg-white'
              }`}
              style={{ marginTop: '12%' }}
            >
              서비스 기획
            </Link>
            <Link 
              to="/novel/1" 
              className={`px-8 py-3 rounded-none text-base md:text-lg lg:text-xl font-medium transition-colors duration-200 ${
                isActive('/novel/1') 
                  ? 'text-[#16EF72] bg-black' 
                  : 'text-black hover:text-[#16EF72] hover:bg-white'
              }`}
              style={{ marginTop: '12%' }}
            >
              AI 프롬프팅
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-primary p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 