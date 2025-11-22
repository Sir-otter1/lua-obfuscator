# 🔐 Lua Obfuscator

A powerful, web-based Lua code obfuscator with military-grade protection techniques. Protect your intellectual property with advanced anti-deobfuscation methods.

## ✨ Features

### 🛡️ **Advanced Obfuscation Techniques**
- **Variable Name Obfuscation** - Randomizes variable and function names
- **String Obfuscation** - Multiple encoding methods (char codes, hex, concatenation)
- **Control Flow Obfuscation** - Adds redundant conditions and dummy loops
- **Dead Code Insertion** - Inserts unused code to confuse analysis

### 🔒 **Anti-Deobfuscation Protection**
- **Anti-Debug Protection** - Detects and crashes debugging attempts
- **Runtime Integrity Checks** - Validates code hasn't been tampered with
- **Code Encryption** - XOR encryption of entire code payload
- **Self-Modifying Code** - Reconstructs itself in memory during execution
- **Environment Detection** - Validates execution environment

### 🌐 **Universal Compatibility**
- **Standard Lua** - Works with any Lua interpreter
- **Roblox Support** - Preserves Roblox globals and API calls
- **Web-Based** - Runs in any modern web browser
- **Cross-Platform** - Windows, Mac, Linux, mobile devices

## 🚀 **Live Demo**

**Visit the live demo:** [https://yourusername.github.io/lua-obfuscator/](https://yourusername.github.io/lua-obfuscator/)

## 💻 **How to Use**

1. **Upload or Paste Code**
   - Click to upload `.lua` files
   - Or paste your Lua code directly

2. **Configure Options**
   - **Basic**: Variable names, strings, control flow
   - **Advanced**: Anti-debug, encryption, self-modifying code

3. **Obfuscate & Download**
   - Click "Obfuscate Code"
   - Download your protected `.lua` file

## 🛠️ **Local Development**

```bash
# Clone the repository
git clone https://github.com/yourusername/lua-obfuscator.git
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

### After Obfuscation:
```lua
-- Lua Obfuscator (Anti-Deobfuscation)
-- Generated: 2024-01-01T00:00:00.000Z
local _a1b2c3 = function(_x4y5z6, _p7q8r9)
    return _x4y5z6 + _p7q8r9
end
local _s1t2u3 = _a1b2c3(5, 10)
print(string.char(82)..string.char(101)..string.char(115)..string.char(117)..string.char(108)..string.char(116)..string.char(58)..string.char(32).._s1t2u3)
```

## ⚙️ **Configuration Options**

### Basic Obfuscation
- ✅ Variable Names
- ✅ String Obfuscation  
- ✅ Control Flow
- ✅ Dead Code Insertion
- ✅ Compact Output

### Advanced Protection
- 🔴 Anti-Debug
- 🔴 Runtime Checks
- 🔴 Code Encryption
- 🔴 Self-Modifying
- 🔴 Environment Detection

## 🔒 **Security Features**

- **Client-Side Processing** - Code never leaves your browser
- **No Server Required** - Works offline after loading
- **Privacy Focused** - No tracking or analytics
- **Open Source** - Fully transparent and auditable

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

---

**Made with ❤️ for the Lua community**
