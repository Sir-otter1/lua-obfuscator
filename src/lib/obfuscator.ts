interface ObfuscationOptions {
  obfuscateVariables: boolean
  obfuscateStrings: boolean
  obfuscateControlFlow: boolean
  insertDeadCode: boolean
  compactCode: boolean
  antiDebug: boolean
  runtimeChecks: boolean
  encryptCode: boolean
  selfModifying: boolean
  environmentDetection: boolean
}

class LuaObfuscator {
  private usedNames = new Set<string>()
  private luaKeywords = new Set([
    'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'if', 'in',
    'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while', 'goto'
  ])
  
  // Roblox-specific globals that should not be obfuscated
  private robloxGlobals = new Set([
    'game', 'workspace', 'script', 'players', 'lighting', 'replicatedfirst', 'replicatedstorage',
    'serverstorage', 'serverscriptservice', 'startergui', 'starterpack', 'starterplayer',
    'teams', 'soundservice', 'chat', 'logservice', 'testservice', 'httpService', 'insertService',
    'marketplaceService', 'teamsService', 'teleportService', 'userInputService', 'contextActionService',
    'runService', 'studioService', 'terrain', 'debris', 'changeHistoryService', 'selection',
    'collectionService', 'physicsService', 'pathfindingService', 'controllerManagerService',
    'groupService', 'badgeService', 'pointsService', 'leaderstats', 'player', 'character', 'humanoid',
    'part', 'meshpart', 'unionoperation', 'negateoperation', 'trusspart', 'wedgepart', 'cornerwedgepart',
    'vehicleseat', 'seat', 'spawnlocation', 'camera', 'tool', 'hopperbin', 'accoutrement', 'hat',
    'model', 'folder', 'boolvalue', 'brickcolorvalue', 'cframevalue', 'color3value', 'colorsequence',
    'colorsequencekeypoint', 'intvalue', 'numbervalue', 'objectvalue', 'rayvalue', 'rect', 'region3',
    'region3int16', 'scriptsignal', 'stringvalue', 'vector3value', 'u Dim2', 'vector2', 'vector3',
    'cframe', 'ray', 'udim', 'udim2', 'color3', 'brickcolor', 'numbersequence', 'numbersequencekeypoint',
    'colorsequence', 'colorsequencekeypoint', 'instance', 'bodymovers', 'bodyvelocity', 'bodyangularvelocity',
    'bodyposition', 'bodygyro', 'bodythrust', 'bodyforce', 'rocketpropulsion', 'alignposition', 'alignorientation'
  ])

  private generateObfuscatedName(prefix: string = '_'): string {
    let name: string
    do {
      // Generate names that are valid Lua identifiers and Roblox-friendly
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'
      const length = 6 + Math.floor(Math.random() * 6) // Shorter names for Roblox
      name = prefix
      for (let i = 0; i < length; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      // Ensure it starts with a letter or underscore (valid Lua identifier)
      if (!/^[a-zA-Z_]/.test(name)) {
        name = '_' + name
      }
    } while (this.usedNames.has(name) || this.luaKeywords.has(name) || this.robloxGlobals.has(name))
    
    this.usedNames.add(name)
    return name
  }

  private simpleXorEncrypt(str: string, key: number): number[] {
    const encrypted: number[] = []
    for (let i = 0; i < str.length; i++) {
      encrypted.push(str.charCodeAt(i) ^ key)
    }
    return encrypted
  }

  private generateAntiDebugCode(): string {
    const varName = this.generateObfuscatedName()
    const checkName = this.generateObfuscatedName()
    const errorName = this.generateObfuscatedName()
    
    return `
-- Anti-debug protection
local ${varName} = os and os.clock or clock
local ${checkName} = function()
    local start = ${varName}()
    for i = 1, 100000 do end
    local diff = ${varName}() - start
    if diff > 0.1 then
        local ${errorName} = function() error("Debug detected!") end
        ${errorName}()
    end
end
${checkName}()
`
  }

  private generateRuntimeChecks(): string {
    const integrityVar = this.generateObfuscatedName()
    const checkVar = this.generateObfuscatedName()
    const hashVar = this.generateObfuscatedName()
    
    return `
-- Runtime integrity check
local ${integrityVar} = {}
local ${checkVar} = function()
    local ${hashVar} = 0
    for k, v in pairs(${integrityVar}) do
        ${hashVar} = ${hashVar} + #tostring(k) + #tostring(v)
    end
    if ${hashVar} % 7 ~= 3 then
        while true do end -- Infinite loop if tampered
    end
end
${integrityVar}.check = ${checkVar}
${checkVar}()
`
  }

  private generateEncryptionWrapper(code: string): string {
    const key = Math.floor(Math.random() * 255) + 1
    const encrypted = this.simpleXorEncrypt(code, key)
    const decryptVar = this.generateObfuscatedName()
    const encryptedVar = this.generateObfuscatedName()
    const keyVar = this.generateObfuscatedName()
    
    return `
-- Encrypted code wrapper
local ${keyVar} = ${key}
local ${encryptedVar} = {${encrypted.join(',')}}
local ${decryptVar} = function(data, key)
    local result = ""
    for i = 1, #data do
        result = result .. string.char(data[i] ~ key)
    end
    return result
end
local compiled = load(${decryptVar}(${encryptedVar}, ${keyVar}))
if compiled then
    compiled()
end
`
  }

  private generateSelfModifyingCode(code: string): string {
    const funcVar = this.generateObfuscatedName()
    const modifyVar = this.generateObfuscatedName()
    const chunksVar = this.generateObfuscatedName()
    
    // Split code into chunks
    const chunkSize = 100
    const chunks = []
    for (let i = 0; i < code.length; i += chunkSize) {
      chunks.push(code.substring(i, i + chunkSize))
    }
    
    const chunkArrays = chunks.map(chunk => 
      `{${chunk.split('').map(c => c.charCodeAt(0)).join(',')}}`
    )
    
    return `
-- Self-modifying code
local ${chunksVar} = {${chunkArrays.join(',')}}
local ${modifyVar} = function(data)
    local result = ""
    for i = 1, #data do
        result = result .. string.char(data[i])
    end
    return result
end
local ${funcVar} = function()
    local code = ""
    for i = 1, #${chunksVar} do
        code = code .. ${modifyVar}(${chunksVar}[i])
        ${chunksVar}[i] = nil -- Clear chunk after use
    end
    return load(code)
end
local compiled = ${funcVar}()
if compiled then
    compiled()
end
`
  }

  private generateEnvironmentDetection(): string {
    const detectVar = this.generateObfuscatedName()
    const checkVar = this.generateObfuscatedName()
    const safeVar = this.generateObfuscatedName()
    
    return `
-- Environment detection
local ${detectVar} = {
    roblox = function() 
        return (game and game.GetService) or (workspace and workspace.FindFirstChild)
    end,
    standard = function()
        return io and io.open and os and os.execute
    end
}
local ${checkVar} = function()
    if ${detectVar}.roblox() then
        -- Roblox environment detected
        return true
    elseif ${detectVar}.standard() then
        -- Standard Lua environment detected
        return true
    else
        local ${safeVar} = function() return "Unknown environment" end
        return ${safeVar}()
    end
end
local env_ok = ${checkVar}()
if not env_ok or env_ok == "Unknown environment" then
    error("Unsupported environment")
end
`
  }

  private obfuscateString(str: string): string {
    // Roblox-safe string obfuscation techniques
    const techniques = [
      // Char codes (most compatible)
      () => {
        const chars = str.split('').map(c => c.charCodeAt(0)).join(',')
        return `string.char(${chars})`
      },
      // Split concatenation (safe)
      () => {
        const parts = []
        for (let i = 0; i < str.length; i += 2) {
          const part = str.substring(i, i + 2)
          parts.push(`"${part}"`)
        }
        return parts.join('..')
      },
      // Mix of char codes and strings
      () => {
        const parts = []
        for (let i = 0; i < str.length; i++) {
          const c = str[i]
          if (i % 3 === 0) {
            parts.push(`string.char(${c.charCodeAt(0)})`)
          } else {
            parts.push(`"${c}"`)
          }
        }
        return parts.join('..')
      }
    ]

    const technique = techniques[Math.floor(Math.random() * techniques.length)]
    return technique()
  }

  private obfuscateVariable(name: string): string {
    if (this.luaKeywords.has(name) || this.robloxGlobals.has(name)) return name
    return this.generateObfuscatedName()
  }

  private insertDeadCode(): string {
    // Roblox-safe dead code that won't cause performance issues
    const deadCodeSnippets = [
      `local ${this.generateObfuscatedName()} = ${Math.floor(Math.random() * 100)}`,
      `if (${Math.random() > 0.5}) then local ${this.generateObfuscatedName()} = nil end`,
      `local ${this.generateObfuscatedName()} = function() return nil end`,
      `do local ${this.generateObfuscatedName()} = ${Math.random()} end`,
      `-- ${this.generateObfuscatedName()} = ${Math.floor(Math.random() * 1000)}`,
      `local ${this.generateObfuscatedName()} = {}`,
      `if false then local ${this.generateObfuscatedName()} = "unused" end`
    ]
    return deadCodeSnippets[Math.floor(Math.random() * deadCodeSnippets.length)]
  }

  private obfuscateControlFlow(code: string): string {
    // Add simple, safe control flow obfuscation
    const lines = code.split('\n')
    const obfuscatedLines: string[] = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      obfuscatedLines.push(line)
      
      // Randomly insert simple dummy conditions
      if (Math.random() > 0.8 && line.trim() && !line.trim().startsWith('--') && !line.trim().startsWith('local')) {
        const dummyVar = this.generateObfuscatedName()
        const dummyCondition = Math.random() > 0.5
        obfuscatedLines.push(`if ${dummyCondition} then local ${dummyVar} = ${Math.floor(Math.random() * 100)} end`)
      }
    }
    
    return obfuscatedLines.join('\n')
  }

  private extractVariables(code: string): string[] {
    // More robust variable extraction that respects Roblox globals
    const variables = new Set<string>()
    
    // Extract local variables
    const localVarPattern = /local\s+([a-zA-Z_][a-zA-Z0-9_]*)/g
    let match
    while ((match = localVarPattern.exec(code)) !== null) {
      const varName = match[1]
      if (!this.luaKeywords.has(varName) && !this.robloxGlobals.has(varName)) {
        variables.add(varName)
      }
    }
    
    // Extract function names
    const funcPattern = /function\s+([a-zA-Z_][a-zA-Z0-9_]*)/g
    while ((match = funcPattern.exec(code)) !== null) {
      const funcName = match[1]
      if (!this.luaKeywords.has(funcName) && !this.robloxGlobals.has(funcName)) {
        variables.add(funcName)
      }
    }
    
    // Extract variable assignments
    const assignPattern = /([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g
    while ((match = assignPattern.exec(code)) !== null) {
      const varName = match[1]
      if (!this.luaKeywords.has(varName) && !this.robloxGlobals.has(varName) && !variables.has(varName)) {
        // Only add if it's not a local keyword or global
        if (!code.includes(`local ${varName}`) && !code.includes(`function ${varName}`)) {
          variables.add(varName)
        }
      }
    }

    return Array.from(variables)
  }

  private extractStrings(code: string): string[] {
    // Extract string literals but avoid those in comments
    const strings: string[] = []
    const lines = code.split('\n')
    
    for (const line of lines) {
      if (line.trim().startsWith('--')) continue // Skip comments
      
      const stringPattern = /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/g
      let match
      
      while ((match = stringPattern.exec(line)) !== null) {
        const str = match[1] || match[3]
        if (str && str.length > 0) { // Only obfuscate non-empty strings
          strings.push(str)
        }
      }
    }

    return strings
  }

  private isRobloxScript(code: string): boolean {
    // Detect if this is likely a Roblox script
    const robloxPatterns = [
      /game\./,
      /workspace\./,
      /script\./,
      /players\./,
      /Instance\.new/,
      /Wait\(/,
      /wait\(/,
      /spawn\(/,
      /delay\(/,
      /LoadLibrary/
    ]
    
    return robloxPatterns.some(pattern => pattern.test(code))
  }

  public obfuscate(code: string, options: ObfuscationOptions): string {
    this.usedNames.clear()

    let obfuscatedCode = code
    
    // Add header with info
    const isRoblox = this.isRobloxScript(code)
    const header = `-- ${isRoblox ? 'Roblox' : 'Lua'} Obfuscator (Anti-Deobfuscation)\n-- Generated: ${new Date().toISOString()}\n`
    
    // Step 1: Add anti-deobfuscation layers
    if (options.antiDebug) {
      obfuscatedCode = this.generateAntiDebugCode() + obfuscatedCode
    }
    
    if (options.runtimeChecks) {
      obfuscatedCode = this.generateRuntimeChecks() + obfuscatedCode
    }
    
    if (options.environmentDetection) {
      obfuscatedCode = this.generateEnvironmentDetection() + obfuscatedCode
    }
    
    // Step 2: Variable name obfuscation (more conservative for Roblox)
    if (options.obfuscateVariables) {
      const variables = this.extractVariables(obfuscatedCode)
      const variableMap = new Map<string, string>()

      variables.forEach(variable => {
        variableMap.set(variable, this.obfuscateVariable(variable))
      })

      // Replace variables with word boundaries to avoid partial matches
      variableMap.forEach((newName, oldName) => {
        const regex = new RegExp(`\\b${oldName}\\b`, 'g')
        obfuscatedCode = obfuscatedCode.replace(regex, newName)
      })
    }

    // Step 3: String obfuscation
    if (options.obfuscateStrings) {
      const strings = this.extractStrings(obfuscatedCode)
      const stringMap = new Map<string, string>()

      strings.forEach(str => {
        stringMap.set(str, this.obfuscateString(str))
      })

      // Replace strings carefully
      stringMap.forEach((newStr, oldStr) => {
        // Escape special regex characters
        const escapedOldStr = oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`["']${escapedOldStr}["']`, 'g')
        obfuscatedCode = obfuscatedCode.replace(regex, newStr)
      })
    }

    // Step 4: Control flow obfuscation (lighter for Roblox)
    if (options.obfuscateControlFlow) {
      obfuscatedCode = this.obfuscateControlFlow(obfuscatedCode)
    }

    // Step 5: Dead code insertion (conservative for Roblox)
    if (options.insertDeadCode) {
      const lines = obfuscatedCode.split('\n')
      const obfuscatedLines: string[] = []
      
      for (const line of lines) {
        obfuscatedLines.push(line)
        
        // Less frequent dead code insertion for Roblox
        if (Math.random() > 0.9 && line.trim() && !line.trim().startsWith('--')) {
          obfuscatedLines.push(this.insertDeadCode())
        }
      }
      
      obfuscatedCode = obfuscatedLines.join('\n')
    }

    // Step 6: Advanced anti-deobfuscation techniques
    if (options.encryptCode) {
      obfuscatedCode = this.generateEncryptionWrapper(obfuscatedCode)
    }
    
    if (options.selfModifying) {
      obfuscatedCode = this.generateSelfModifyingCode(obfuscatedCode)
    }

    // Step 7: Code compaction (optional - not always good for debugging)
    if (options.compactCode) {
      obfuscatedCode = obfuscatedCode
        .replace(/\s+/g, ' ')
        .replace(/\n\s*/g, '\n')
        .trim()
    }

    return header + obfuscatedCode
  }
}

export const luaObfuscator = new LuaObfuscator()
export type { ObfuscationOptions }
