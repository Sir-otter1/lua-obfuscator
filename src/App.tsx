import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Tooltip } from './components/ui/tooltip'
import { Upload, Download, Shield, Zap, Lock, Eye, EyeOff, Code, Settings, Palette } from 'lucide-react'
import { luaObfuscator, ObfuscationOptions } from './lib/obfuscator'
import { themes, applyTheme, Theme } from './lib/themes'

function App() {
  const [code, setCode] = useState(`-- Sample Lua Script
local function calculateSum(a, b)
    return a + b
end

local function greet(name)
    local message = "Hello, " .. name .. "!"
    print(message)
    return message
end

local result = calculateSum(5, 10)
greet("World")
print("Sum:", result)`)

  const [obfuscatedCode, setObfuscatedCode] = useState("")
  const [fileName, setFileName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.dark)
  const [options, setOptions] = useState<ObfuscationOptions>({
    obfuscateVariables: true,
    obfuscateStrings: true,
    obfuscateControlFlow: true,
    insertDeadCode: false,
    compactCode: true,
    
    // Enhanced Basic Features
    obfuscateFunctions: true,
    obfuscateNumbers: false,
    obfuscateTables: false,
    obfuscateOperators: false,
    addJunkCode: false,
    
    // Advanced Protection
    antiDebug: false,
    runtimeChecks: false,
    encryptCode: false,
    selfModifying: false,
    environmentDetection: false,
    
    // New Advanced Features
    controlFlowFlattening: false,
    opaquePredicates: false,
    virtualMachineProtection: false,
    stringSplitting: false,
    deadBranchInsertion: false
  })

  // Apply theme when it changes
  useEffect(() => {
    applyTheme(currentTheme)
  }, [currentTheme])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.name.endsWith(".lua")) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        setCode(e.target?.result as string)
        setObfuscatedCode("")
      }
      reader.readAsText(file)
    }
  }

  const handleObfuscate = () => {
    if (!code.trim()) return
    
    setIsProcessing(true)
    
    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        const result = luaObfuscator.obfuscate(code, options)
        setObfuscatedCode(result)
      } catch (error) {
        console.error('Obfuscation error:', error)
        setObfuscatedCode('-- Error during obfuscation\n-- Please check your input code')
      } finally {
        setIsProcessing(false)
      }
    }, 1500)
  }

  const handleDownload = () => {
    if (!obfuscatedCode) return
    
    const blob = new Blob([obfuscatedCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName.replace(".lua", "_obfuscated.lua")
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Shield className="h-16 w-16 text-blue-400 mr-4" />
              <Zap className="h-8 w-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Lua Obfuscator
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced Lua code protection with military-grade obfuscation techniques.
            Secure your intellectual property with cutting-edge anti-deobfuscation methods.
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="flex items-center text-sm text-gray-400">
              <Lock className="h-4 w-4 mr-1" />
              Military-Grade Protection
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Zap className="h-4 w-4 mr-1" />
              Lightning Fast
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Shield className="h-4 w-4 mr-1" />
              Universal Compatibility
            </div>
          </div>
          
          {/* Theme Selector */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
              <Palette className="w-4 h-4 text-gray-400" />
              <label className="text-sm text-gray-300">Theme:</label>
              <select
                value={currentTheme.name}
                onChange={(e) => setCurrentTheme(themes[e.target.value])}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.values(themes).map((theme) => (
                  <option key={theme.name} value={theme.name}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <Card className="mb-8 border-gray-700 bg-gray-800/50 backdrop-blur-sm">
          <CardHeader className="border-gray-700">
            <CardTitle className="flex items-center text-gray-100">
              <Settings className="h-5 w-5 mr-2 text-blue-400" />
              Obfuscation Configuration
            </CardTitle>
            <CardDescription className="text-gray-400">
              Choose your protection level and techniques
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Options */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-200">Basic Obfuscation</h3>
                <span className="text-xs text-gray-500">Recommended for most users</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.obfuscateVariables}
                    onChange={(e) => setOptions({...options, obfuscateVariables: e.target.checked})}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Variable Names</span>
                  <Tooltip text="Renames variables with random alphanumeric names" />
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.obfuscateStrings}
                    onChange={(e) => setOptions({...options, obfuscateStrings: e.target.checked})}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">String Obfuscation</span>
                  <Tooltip text="Converts strings to character codes and concatenations" />
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.obfuscateControlFlow}
                    onChange={(e) => setOptions({...options, obfuscateControlFlow: e.target.checked})}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Control Flow</span>
                  <Tooltip text="Adds redundant conditions and dummy loops" />
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.obfuscateFunctions}
                    onChange={(e) => setOptions({...options, obfuscateFunctions: e.target.checked})}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Function Names</span>
                  <Tooltip text="Renames function definitions and calls with random names" />
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.obfuscateNumbers}
                    onChange={(e) => setOptions({...options, obfuscateNumbers: e.target.checked})}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Number Obfuscation</span>
                  <Tooltip text="Converts numbers to mathematical expressions like (5+3)" />
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.obfuscateTables}
                    onChange={(e) => setOptions({...options, obfuscateTables: e.target.checked})}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Table Obfuscation</span>
                  <Tooltip text="Obfuscates table keys and access patterns" />
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.obfuscateOperators}
                    onChange={(e) => setOptions({...options, obfuscateOperators: e.target.checked})}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Operator Obfuscation</span>
                  <Tooltip text="Replaces operators with function calls" />
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.addJunkCode}
                    onChange={(e) => setOptions({...options, addJunkCode: e.target.checked})}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Junk Code</span>
                  <Tooltip text="Inserts meaningless but valid code to confuse analysis" />
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.insertDeadCode}
                    onChange={(e) => setOptions({...options, insertDeadCode: e.target.checked})}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Dead Code Insertion</span>
                  <Tooltip text="Adds unused code that never executes" />
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.compactCode}
                    onChange={(e) => setOptions({...options, compactCode: e.target.checked})}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Compact Output</span>
                  <Tooltip text="Removes extra whitespace and formatting" />
                </label>
              </div>
            </div>
            
            {/* Advanced Options */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-200">Advanced Protection</h3>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {showAdvanced ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                  {showAdvanced ? 'Hide' : 'Show'} Advanced
                </button>
              </div>
              
              {showAdvanced && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={options.antiDebug}
                      onChange={(e) => setOptions({...options, antiDebug: e.target.checked})}
                      className="rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-offset-0 bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Anti-Debug</span>
                    <Tooltip text="Detects and crashes debugging attempts" />
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={options.runtimeChecks}
                      onChange={(e) => setOptions({...options, runtimeChecks: e.target.checked})}
                      className="rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-offset-0 bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Runtime Checks</span>
                    <Tooltip text="Validates code integrity during execution" />
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={options.encryptCode}
                      onChange={(e) => setOptions({...options, encryptCode: e.target.checked})}
                      className="rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-offset-0 bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Code Encryption</span>
                    <Tooltip text="XOR encryption of entire code payload" />
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={options.selfModifying}
                      onChange={(e) => setOptions({...options, selfModifying: e.target.checked})}
                      className="rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-offset-0 bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Self-Modifying</span>
                    <Tooltip text="Reconstructs code in memory during execution" />
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={options.environmentDetection}
                      onChange={(e) => setOptions({...options, environmentDetection: e.target.checked})}
                      className="rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-offset-0 bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Environment Detection</span>
                    <Tooltip text="Validates execution environment (Roblox vs standard Lua)" />
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={options.controlFlowFlattening}
                      onChange={(e) => setOptions({...options, controlFlowFlattening: e.target.checked})}
                      className="rounded border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Control Flow Flattening</span>
                    <Tooltip text="Breaks code into dispatcher-based structure" />
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={options.opaquePredicates}
                      onChange={(e) => setOptions({...options, opaquePredicates: e.target.checked})}
                      className="rounded border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Opaque Predicates</span>
                    <Tooltip text="Adds conditions that always evaluate the same way" />
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={options.virtualMachineProtection}
                      onChange={(e) => setOptions({...options, virtualMachineProtection: e.target.checked})}
                      className="rounded border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Virtual Machine</span>
                    <Tooltip text="Simulates bytecode execution for protection" />
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={options.stringSplitting}
                      onChange={(e) => setOptions({...options, stringSplitting: e.target.checked})}
                      className="rounded border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">String Splitting</span>
                    <Tooltip text="Breaks strings into concatenated parts" />
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={options.deadBranchInsertion}
                      onChange={(e) => setOptions({...options, deadBranchInsertion: e.target.checked})}
                      className="rounded border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">Dead Branches</span>
                    <Tooltip text="Adds unreachable code branches" />
                  </label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
            <CardHeader className="border-gray-700">
              <CardTitle className="flex items-center text-gray-100">
                <Upload className="h-5 w-5 mr-2 text-blue-400" />
                Input Code
              </CardTitle>
              <CardDescription className="text-gray-400">
                Upload a Lua file or paste your code directly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-all duration-300 bg-gray-900/30">
                <input
                  type="file"
                  accept=".lua"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="h-8 w-8 text-gray-500" />
                  <span className="text-sm text-gray-400">
                    {fileName || "Click to upload Lua file"}
                  </span>
                </label>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Or paste your Lua code here..."
                className="w-full h-64 p-4 border border-gray-600 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900/50 text-gray-100 placeholder-gray-500"
              />
              
              <Button 
                onClick={handleObfuscate} 
                disabled={!code.trim() || isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 transform hover:scale-[1.02]"
              >
                {isProcessing ? (
                  <>
                    <Settings className="h-4 w-4 mr-2 animate-spin" />
                    Obfuscating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Obfuscate Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
            <CardHeader className="border-gray-700">
              <CardTitle className="flex items-center text-gray-100">
                <Code className="h-5 w-5 mr-2 text-green-400" />
                Obfuscated Output
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your protected Lua code will appear here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <textarea
                  value={obfuscatedCode}
                  readOnly
                  placeholder="Obfuscated code will appear here..."
                  className="w-full h-64 p-4 border border-gray-600 rounded-md font-mono text-sm resize-none bg-gray-900/50 text-gray-100 placeholder-gray-500"
                />
                {obfuscatedCode && (
                  <Button
                    onClick={handleDownload}
                    size="sm"
                    className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
              
              {obfuscatedCode && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-900/50 rounded-md p-3 border border-gray-700">
                    <div className="font-medium text-gray-400">Original Size</div>
                    <div className="text-lg font-semibold text-gray-200">{code.length} bytes</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-md p-3 border border-gray-700">
                    <div className="font-medium text-gray-400">Obfuscated Size</div>
                    <div className="text-lg font-semibold text-gray-200">{obfuscatedCode.length} bytes</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2 text-gray-100">Universal Compatibility</h3>
              <p className="text-sm text-gray-400">
                Works with standard Lua, Roblox, and web-based Lua environments
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
            <CardContent className="pt-6">
              <Code className="h-8 w-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2 text-gray-100">Environment Detection</h3>
              <p className="text-sm text-gray-400">
                Automatically adapts to the target Lua environment
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
            <CardContent className="pt-6">
              <Settings className="h-8 w-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2 text-gray-100">Cross-Platform Safe</h3>
              <p className="text-sm text-gray-400">
                Generates code that runs in any Lua interpreter
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App
