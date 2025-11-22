export default function Header() {
  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🔗 TinyLink
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-blue-600 font-semibold border-b-2 border-blue-600 px-3 py-2">
                Dashboard
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 transition-colors">
                Analytics
              </a>
            </nav>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            Professional URL Shortener
          </div>
        </div>
      </div>
    </header>
  );
}