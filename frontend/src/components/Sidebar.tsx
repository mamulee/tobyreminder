"use client";

export default function Sidebar() {
  return (
    <aside className="w-[280px] min-h-full p-4 overflow-y-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="검색"
          className="w-full px-3 py-2 bg-[#e5e5ea] rounded-lg text-sm placeholder-gray-500 outline-none"
          disabled
        />
      </div>

      {/* 스마트 리스트 placeholder */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="bg-white rounded-xl p-3 opacity-50">
          <div className="flex justify-between items-start mb-2">
            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📅</span>
            </div>
            <span className="text-xl font-bold text-gray-800">0</span>
          </div>
          <p className="text-sm font-medium text-gray-500">오늘</p>
        </div>
        <div className="bg-white rounded-xl p-3 opacity-50">
          <div className="flex justify-between items-start mb-2">
            <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📋</span>
            </div>
            <span className="text-xl font-bold text-gray-800">0</span>
          </div>
          <p className="text-sm font-medium text-gray-500">예정</p>
        </div>
        <div className="bg-white rounded-xl p-3 opacity-50">
          <div className="flex justify-between items-start mb-2">
            <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📥</span>
            </div>
            <span className="text-xl font-bold text-gray-800">0</span>
          </div>
          <p className="text-sm font-medium text-gray-500">전체</p>
        </div>
        <div className="bg-white rounded-xl p-3 opacity-50">
          <div className="flex justify-between items-start mb-2">
            <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🚩</span>
            </div>
            <span className="text-xl font-bold text-gray-800">0</span>
          </div>
          <p className="text-sm font-medium text-gray-500">플래그 지정됨</p>
        </div>
      </div>

      {/* 나의 목록 placeholder */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
          나의 목록
        </h3>
        <p className="text-sm text-gray-400 px-1">목록이 없습니다</p>
      </div>
    </aside>
  );
}
