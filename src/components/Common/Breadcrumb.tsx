import Link from "next/link";
import React from "react";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = ({ title, pages }) => {
  return (
    <div className="overflow-hidden pt-[209px] sm:pt-[155px] lg:pt-[95px] xl:pt-[165px]" style={{
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      backgroundColor: '#f5f1ed'
    }}>
      <div className="border-t-2" style={{ borderColor: '#e5d9d0' }}>
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 py-6 xl:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="font-bold text-2xl sm:text-3xl xl:text-4xl" style={{ color: '#4F1719' }}>
              {title}
            </h1>

            <nav aria-label="breadcrumb">
              <ul className="flex items-center gap-2">
                <li>
                  <Link 
                    href="/" 
                    className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:opacity-70"
                    style={{ color: '#666666' }}
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </li>

                {pages.length > 0 &&
                  pages.map((page, key) => (
                    <React.Fragment key={key}>
                      <li>
                        <ChevronRight className="w-4 h-4" style={{ color: '#e5d9d0' }} />
                      </li>
                      <li 
                        className={`text-sm font-medium capitalize ${
                          key === pages.length - 1 ? 'font-semibold' : ''
                        }`}
                        style={{ 
                          color: key === pages.length - 1 ? '#832729' : '#666666'
                        }}
                      >
                        {page}
                      </li>
                    </React.Fragment>
                  ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;