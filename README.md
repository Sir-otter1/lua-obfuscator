# 🔐 Lua Obfuscator - Military-Grade Code Protection

A **powerful, web-based Lua code obfuscator** with military-grade protection techniques. Protect your intellectual property with advanced anti-deobfuscation methods and beautiful customizable themes.

## ✨ **Massive Feature Update v2.0**

### 🛡️ **Enhanced Basic Obfuscation**
- ✅ **Variable Name Obfuscation** - Randomizes variable and function names
- ✅ **String Obfuscation** - Multiple encoding methods (char codes, hex, concatenation)
- ✅ **Control Flow Obfuscation** - Adds redundant conditions and dummy loops
- ✅ **Function Name Obfuscation** - Renames all custom functions
- ✅ **Number Obfuscation** - Converts numbers to mathematical expressions
- ✅ **Table Obfuscation** - Obfuscates table keys and access patterns
- ✅ **Operator Obfuscation** - Replaces operators with function calls
- ✅ **Junk Code Insertion** - Inserts meaningless but valid code
- ✅ **Dead Code Insertion** - Inserts unused code to confuse analysis
- ✅ **Compact Output** - Removes extra whitespace and formatting

### 🔒 **Advanced Anti-Deobfuscation Protection**
- 🔴 **Anti-Debug Protection** - Detects and crashes debugging attempts
- 🔴 **Runtime Integrity Checks** - Validates code hasn't been tampered with
- 🔴 **Code Encryption** - XOR encryption of entire code payload
- 🔴 **Self-Modifying Code** - Reconstructs itself in memory during execution
- 🔴 **Environment Detection** - Validates execution environment

### 🚀 **Extreme Protection Features**
- 🟠 **Control Flow Flattening** - Breaks code into dispatcher-based structure
- 🟠 **Opaque Predicates** - Adds conditions that always evaluate the same way
- 🟠 **Virtual Machine Protection** - Simulates bytecode execution for protection
- 🟠 **String Splitting** - Breaks strings into concatenated parts
- 🟠 **Dead Branch Insertion** - Adds unreachable code branches

### 🎨 **Beautiful Theme System**
- 🌈 **8 Color Themes** - Dark, Purple, Green, Red, Blue, Orange, Pink, Cyan
- 🎯 **Dynamic Gradients** - Each theme has unique background gradients
- 🔄 **Instant Switching** - Real-time theme changes
- 🎭 **Professional Design** - Carefully crafted color palettes

### 🌐 **Universal Compatibility**
- ✅ **Standard Lua** - Works with any Lua interpreter
- ✅ **Roblox Support** - Preserves Roblox globals and API calls
- ✅ **Web-Based** - Runs in any modern web browser
- ✅ **Cross-Platform** - Windows, Mac, Linux, mobile devices

## 🚀 **Live Demo**

**🔗 Visit the live demo:** [https://sir-otter1.github.io/lua-obfuscator/](https://sir-otter1.github.io/lua-obfuscator/)

## 💻 **How to Use**

### 1️⃣ **Upload or Paste Code**
- 📁 Click to upload `.lua` files
- 📝 Or paste your Lua code directly

### 2️⃣ **Configure Protection Level**
- 🔰 **Basic**: Variable names, strings, control flow
- 🔥 **Advanced**: Anti-debug, encryption, self-modifying code
- 💀 **Extreme**: Control flow flattening, VM protection, opaque predicates

### 3️⃣ **Customize & Obfuscate**
- 🎨 Choose your favorite theme
- 💡 Hover over features for helpful tooltips
- ⚡ Click "Obfuscate Code"
- 📥 Download your protected `.lua` file

## 🛠️ **Local Development**

```bash
# Clone the repository
git clone https://github.com/Sir-otter1/lua-obfuscator.git
cd lua-obfuscator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 **Deployment**

This project is configured for automatic deployment to GitHub Pages:

1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings
3. **Push changes** to main branch
4. **Automatic deployment** via GitHub Actions

## 🎯 **Example Usage**

### Before Obfuscation:
```lua
local function calculateSum(a, b)
    return a + b
end

local result = calculateSum(5, 10)
print("Result: " .. result)
```

### After Obfuscation (Maximum Protection):
```lua
-- Lua Obfuscator v2.0 - Military-Grade Protection
-- Generated with Advanced Anti-Deobfuscation

-- Environment Detection & Anti-Debug
local function _0x1a2b() return type(debug) ~= "table" end
if not _0x1a2b() then error("Environment check failed") end

-- Control Flow Flattening
local _0x3c4d = {pc=1, stack={}, bytecode={
  {op="load", val=function(_0x5e6f,_0x7g8h) return _0x5e6f + _0x7g8h end},
  {op="call"}, {op="end"}
}}

-- Obfuscated Function with Number Protection
local function _0x9i0j(_0xk1l,_0m2n)
  return (_0xk1l+_0m2n)
end

-- String Splitting & Table Obfuscation
local _0o3p = _0x9i0j((5+3), (7+3))
print(string.char(82)..string.char(101)..string.char(115)..string.char(117)..string.char(108)..string.char(116)..string.char(58)..string.char(32).._0o3p)
```

## ⚙️ **Configuration Options**

### 🔰 **Basic Obfuscation**
- ✅ Variable Names - Random alphanumeric names
- ✅ String Obfuscation - Character codes & concatenation
- ✅ Control Flow - Redundant conditions & dummy loops
- ✅ Function Names - Random function renaming
- ✅ Number Obfuscation - Mathematical expressions
- ✅ Table Obfuscation - Keys and access patterns
- ✅ Operator Obfuscation - Function call replacements
- ✅ Junk Code - Meaningless but valid code
- ✅ Dead Code Insertion - Unused code paths
- ✅ Compact Output - Whitespace removal

### 🔥 **Advanced Protection**
- 🔴 Anti-Debug - Debugging detection & crash
- 🔴 Runtime Checks - Integrity validation
- 🔴 Code Encryption - XOR encryption payload
- 🔴 Self-Modifying - Memory reconstruction
- 🔴 Environment Detection - Roblox/Lua validation

### 💀 **Extreme Protection**
- 🟠 Control Flow Flattening - Dispatcher structure
- 🟠 Opaque Predicates - Always-true/false conditions
- 🟠 Virtual Machine - Bytecode simulation
- 🟠 String Splitting - Concatenated parts
- 🟠 Dead Branches - Unreachable code paths

## 🎨 **Theme System**

### Available Themes:
- 🌙 **Dark** - Classic blue dark theme
- 💜 **Purple** - Royal purple with violet accents
- 🌿 **Green** - Forest green with emerald highlights
- 🔴 **Red** - Fire red with crimson accents
- 🔵 **Blue** - Ocean blue with sky highlights
- 🟠 **Orange** - Sunset orange with warm tones
- 🩷 **Pink** - Hot pink with rose highlights
- 🟦 **Cyan** - Arctic cyan with teal accents

Each theme includes:
- 🎨 Custom gradient backgrounds
- 🎯 Coordinated color palettes
- 🔄 Instant switching
- 💫 Professional styling

## 🔒 **Security Features**

- 🔒 **Client-Side Processing** - Code never leaves your browser
- 🚫 **No Server Required** - Works offline after loading
- 🛡️ **Privacy Focused** - No tracking or analytics
- 🔍 **Open Source** - Fully transparent and auditable
- ⚡ **Lightning Fast** - Instant obfuscation
- 🎯 **Roblox Safe** - Preserves all Roblox functions

## 🤝 **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ **Disclaimer**

This tool is for educational purposes and protecting legitimate intellectual property. Use responsibly and in accordance with applicable laws and terms of service.

## 🙏 **Acknowledgments**

- [Vite](https://vitejs.dev/) - Fast build tool
- [React](https://reactjs.org/) - UI framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

**🔐 Made with ❤️ for the Lua community**
**⚡ Military-Grade Protection Since 2024**
