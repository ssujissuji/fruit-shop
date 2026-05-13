function Footer() {
  return (
    <footer className="bg-white border-t border-green-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
              <span className="text-sm">🍏</span>
            </div>
            <div>
              <p className="font-bold text-green-700 text-sm">과일가게</p>
              <p className="text-[11px] text-gray-400">신선함을 매일 배달합니다</p>
            </div>
          </div>

          <div className="flex gap-6 text-sm text-gray-400">
            <span>🌿 산지 직송</span>
            <span>🚚 무료 배송</span>
            <span>✅ 품질 보증</span>
          </div>

          <p className="text-xs text-gray-300">© 2024 과일가게. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
