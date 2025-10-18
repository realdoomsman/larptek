class LarpTek {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('input');
        this.history = [];
        this.historyIndex = -1;
        this.startTime = Date.now();
        
        this.setupEventListeners();
        this.focusInput();
        this.updateStatusBar();
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('click', () => this.focusInput());
    }

    handleKeyDown(e) {
        switch(e.key) {
            case 'Enter':
                e.preventDefault();
                this.executeCommand();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
        }
    }

    navigateHistory(direction) {
        if (this.history.length === 0) return;
        
        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = -1;
            this.input.value = '';
        } else if (this.historyIndex >= this.history.length) {
            this.historyIndex = this.history.length - 1;
        } else {
            this.input.value = this.history[this.historyIndex];
        }
    }

    executeCommand() {
        const command = this.input.value.trim();
        if (!command) return;

        this.history.push(command);
        this.historyIndex = this.history.length;
        
        this.addLine(`> ${command}`);
        this.processCommand(command);
        this.input.value = '';
    }

    processCommand(input) {
        const [cmd, ...args] = input.toLowerCase().split(' ');
        
        switch(cmd) {
            case 'help':
                this.showHelp();
                break;
            case 'experiment':
                this.runExperiment();
                break;
            case 'clear':
                this.clear();
                break;
            case 'stats':
                this.showStats();
                break;
            case 'time':
                this.showTime();
                break;
            case 'date':
                this.showDate();
                break;
            case 'analyze':
                this.analyzeText(args.join(' '));
                break;
            case 'sentiment':
                this.analyzeSentiment(args.join(' '));
                break;
            case 'predict':
                this.predictPrice(args[0] || 'BTC');
                break;
            case 'trend':
                this.getTrend(args[0] || 'BTC');
                break;
            case 'hash':
                this.generateHash(args.join(' '));
                break;
            case 'encode':
                this.encodeBase64(args.join(' '));
                break;
            case 'decode':
                this.decodeBase64(args.join(' '));
                break;
            case 'reverse':
                this.reverseText(args.join(' '));
                break;
            case 'random':
                this.generateRandom();
                break;
            case 'uuid':
                this.generateUUID();
                break;
            case 'calc':
                this.calculate(args.join(' '));
                break;
            case 'weather':
                this.getWeather();
                break;
            case 'matrix':
                this.matrixEffect();
                break;
            case 'hack':
                this.hackEffect();
                break;
            case 'ascii':
                this.generateAscii(args.join(' '));
                break;
            case 'binary':
                this.textToBinary(args.join(' '));
                break;
            case 'morse':
                this.textToMorse(args.join(' '));
                break;
            case 'joke':
                this.tellJoke();
                break;
            case 'quote':
                this.randomQuote();
                break;
            case 'dice':
                this.rollDice(args[0] || '6');
                break;
            case 'coin':
                this.flipCoin();
                break;
            case 'password':
                this.generatePassword(parseInt(args[0]) || 12);
                break;
            case 'color':
                this.changeColor(args[0]);
                break;
            case 'neofetch':
                this.neofetch();
                break;
            case 'whoami':
                this.whoAmI();
                break;
            case 'uptime':
                this.showUptime();
                break;
            case 'sysinfo':
                this.showSysInfo();
                break;
            case 'echo':
                this.echoText(args.join(' '));
                break;
            case 'cat':
                this.catFile(args[0]);
                break;
            case 'ls':
                this.listFiles();
                break;
            case 'pwd':
                this.showPwd();
                break;
            case 'reboot':
                this.rebootSystem();
                break;
            case 'shutdown':
                this.shutdownSystem();
                break;
            case 'version':
                this.showVersion();
                break;
            case 'credits':
                this.showCredits();
                break;
            case 'easter':
                this.easterEgg();
                break;
            case 'konami':
                this.konamiCode();
                break;
            default:
                this.addLine(`Command not found: ${cmd}. Type 'help' for available commands.`);
        }
    }

    showHelp() {
        this.addLine('╔══════════════════════════════════════════════════════════════╗');
        this.addLine('║                        LarpTek v2.1                        ║');
        this.addLine('║                    AI Terminal Interface                    ║');
        this.addLine('╚══════════════════════════════════════════════════════════════╝');
        this.addLine('');
        this.addLine('SYSTEM COMMANDS');
        this.addLine('  help               Show this help menu');
        this.addLine('  experiment         Run AI dialogue experiment');
        this.addLine('  clear              Clear terminal screen');
        this.addLine('  stats              Show system statistics');
        this.addLine('  time               Display current time');
        this.addLine('  date               Display current date');
        this.addLine('  uptime             Show system uptime');
        this.addLine('  sysinfo            System information');
        this.addLine('  neofetch           System info display');
        this.addLine('  whoami             Show current user');
        this.addLine('  version            Show version info');
        this.addLine('  credits            Show credits');
        this.addLine('');
        this.addLine('AI ANALYSIS');
        this.addLine('  analyze <text>     AI text analysis');
        this.addLine('  sentiment <text>   Sentiment analysis');
        this.addLine('  predict <symbol>   AI price prediction');
        this.addLine('  trend <symbol>     Market trend analysis');
        this.addLine('');
        this.addLine('DATA PROCESSING');
        this.addLine('  hash <text>        Generate hash');
        this.addLine('  encode <text>      Base64 encoding');
        this.addLine('  decode <text>      Base64 decoding');
        this.addLine('  reverse <text>     Reverse text');
        this.addLine('  binary <text>      Convert to binary');
        this.addLine('  morse <text>       Convert to morse code');
        this.addLine('  ascii <text>       Generate ASCII art');
        this.addLine('');
        this.addLine('UTILITIES');
        this.addLine('  random             Generate random data');
        this.addLine('  uuid               Generate UUID');
        this.addLine('  calc <expression>  Calculator');
        this.addLine('  weather            Weather information');
        this.addLine('  password [length]  Generate password');
        this.addLine('  dice [sides]       Roll dice');
        this.addLine('  coin               Flip coin');
        this.addLine('  joke               Tell a joke');
        this.addLine('  quote              Random quote');
        this.addLine('');
        this.addLine('VISUAL EFFECTS');
        this.addLine('  matrix             Matrix effect');
        this.addLine('  hack               Hack simulation');
        this.addLine('  color <color>      Change text color');
        this.addLine('');
        this.addLine('FILE SYSTEM');
        this.addLine('  ls                 List files');
        this.addLine('  cat <file>         Display file contents');
        this.addLine('  pwd                Show current directory');
        this.addLine('  echo <text>        Echo text');
        this.addLine('');
        this.addLine('SYSTEM CONTROL');
        this.addLine('  reboot             Reboot system');
        this.addLine('  shutdown           Shutdown system');
        this.addLine('');
        this.addLine('EASTER EGGS');
        this.addLine('  easter             Easter egg');
        this.addLine('  konami             Konami code');
        this.addLine('');
        this.addLine('EXAMPLES');
        this.addLine('  analyze Bitcoin is going up');
        this.addLine('  predict BTC');
        this.addLine('  hash hello world');
        this.addLine('  calc 2 + 2 * 3');
        this.addLine('  matrix');
        this.addLine('  neofetch');
    }

    showTime() {
        const now = new Date();
        this.addLine(`Current time: ${now.toLocaleTimeString()}`);
    }

    showDate() {
        const now = new Date();
        this.addLine(`Current date: ${now.toLocaleDateString()}`);
    }

    analyzeText(text) {
        if (!text) {
            this.addLine('Usage: analyze <text>');
            return;
        }

        const words = text.split(' ').length;
        const chars = text.length;
        const vowels = (text.match(/[aeiou]/gi) || []).length;
        
        this.addLine(`Text Analysis: "${text}"`);
        this.addLine(`Words: ${words}, Characters: ${chars}, Vowels: ${vowels}`);
    }

    analyzeSentiment(text) {
        if (!text) {
            this.addLine('Usage: sentiment <text>');
            return;
        }

        const positive = ['good', 'great', 'excellent', 'amazing', 'love', 'happy', 'wonderful'];
        const negative = ['bad', 'terrible', 'awful', 'hate', 'sad', 'angry', 'disappointed'];
        
        const words = text.toLowerCase().split(' ');
        const posCount = words.filter(w => positive.includes(w)).length;
        const negCount = words.filter(w => negative.includes(w)).length;
        
        let sentiment = 'neutral';
        if (posCount > negCount) sentiment = 'positive';
        else if (negCount > posCount) sentiment = 'negative';
        
        this.addLine(`Sentiment Analysis: ${sentiment} (${posCount} positive, ${negCount} negative indicators)`);
    }

    predictPrice(symbol) {
        if (!symbol) {
            this.addLine('Usage: predict <symbol>');
            return;
        }

        const price = this.generatePrice(symbol);
        const prediction = price * (0.8 + Math.random() * 0.4);
        const change = ((prediction - price) / price) * 100;
        
        this.addLine(`AI Price Prediction for ${symbol.toUpperCase()}:`);
        this.addLine(`Current: $${price.toFixed(2)}`);
        this.addLine(`Predicted: $${prediction.toFixed(2)} (${change >= 0 ? '+' : ''}${change.toFixed(2)}%)`);
    }

    getTrend(symbol) {
        if (!symbol) {
            this.addLine('Usage: trend <symbol>');
            return;
        }

        const trend = Math.random() > 0.5 ? 'upward' : 'downward';
        const strength = Math.floor(Math.random() * 100);
        
        this.addLine(`${symbol.toUpperCase()} Trend Analysis:`);
        this.addLine(`Direction: ${trend}`);
        this.addLine(`Strength: ${strength}%`);
    }

    generateHash(text) {
        if (!text) {
            this.addLine('Usage: hash <text>');
            return;
        }

        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        const hashHex = Math.abs(hash).toString(16).toUpperCase();
        this.addLine(`Hash: ${hashHex}`);
    }

    encodeBase64(text) {
        if (!text) {
            this.addLine('Usage: encode <text>');
            return;
        }

        const encoded = btoa(text);
        this.addLine(`Base64: ${encoded}`);
    }

    decodeBase64(text) {
        if (!text) {
            this.addLine('Usage: decode <text>');
            return;
        }

        try {
            const decoded = atob(text);
            this.addLine(`Decoded: ${decoded}`);
        } catch (e) {
            this.addLine('Error: Invalid Base64 string');
        }
    }

    reverseText(text) {
        if (!text) {
            this.addLine('Usage: reverse <text>');
            return;
        }

        const reversed = text.split('').reverse().join('');
        this.addLine(`Reversed: ${reversed}`);
    }

    generateRandom() {
        const randomData = [
            `Random number: ${Math.floor(Math.random() * 1000)}`,
            `Random string: ${Math.random().toString(36).substring(7)}`,
            `Random color: #${Math.floor(Math.random()*16777215).toString(16)}`,
            `Random UUID: ${this.generateUUID()}`,
            `Random hash: ${Math.random().toString(16).substring(2)}`
        ];
        
        const random = randomData[Math.floor(Math.random() * randomData.length)];
        this.addLine(random);
    }

    generateUUID() {
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        
        this.addLine(`UUID: ${uuid}`);
    }

    calculate(expression) {
        if (!expression) {
            this.addLine('Usage: calc <expression>');
            return;
        }

        try {
            const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
            const result = Function(`"use strict"; return (${sanitized})`)();
            this.addLine(`${expression} = ${result}`);
        } catch (error) {
            this.addLine('Error: Invalid mathematical expression');
        }
    }

    getWeather() {
        const conditions = ['sunny', 'cloudy', 'rainy', 'stormy', 'snowy', 'foggy'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const temp = Math.floor(Math.random() * 40) - 10;
        
        this.addLine(`Weather: ${condition}, ${temp}°C`);
    }

    async matrixEffect() {
        await this.typeText('Initializing Matrix protocol...');
        await this.delay(1000);
        
        const matrixText = `
01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100
01001000 01100001 01100011 01101011 01100101 01110010
01001101 01100001 01101110
        `;
        
        await this.typeText(matrixText, 'matrix');
        await this.typeText('Matrix protocol activated');
    }

    async hackEffect() {
        await this.typeText('Initializing hack sequence...');
        await this.delay(1000);
        
        const hackSteps = [
            'Bypassing firewall...',
            'Accessing mainframe...',
            'Cracking encryption...',
            'Installing backdoor...',
            'Extracting data...',
            'Covering tracks...'
        ];

        for (const step of hackSteps) {
            await this.typeText(step, 'hack');
            await this.delay(1200);
        }
        
        await this.typeText('Hack complete. Access granted.');
    }

    generateAscii(text) {
        if (!text) {
            this.addLine('Usage: ascii <text>');
            return;
        }

        const asciiArt = text.toUpperCase().split('').map(char => {
            const patterns = {
                'A': ['  ██  ', ' ████ ', '██  ██', '██████', '██  ██'],
                'B': ['█████ ', '██  ██', '█████ ', '██  ██', '█████ '],
                'C': [' █████', '██    ', '██    ', '██    ', ' █████'],
                'H': ['██  ██', '██  ██', '██████', '██  ██', '██  ██'],
                'E': ['██████', '██    ', '████  ', '██    ', '██████'],
                'L': ['██    ', '██    ', '██    ', '██    ', '██████'],
                'O': [' █████', '██  ██', '██  ██', '██  ██', ' █████']
            };
            return patterns[char] || ['      ', '      ', '      ', '      ', '      '];
        });

        for (let i = 0; i < 5; i++) {
            const line = asciiArt.map(letter => letter[i]).join(' ');
            this.addLine(line);
        }
    }

    textToBinary(text) {
        if (!text) {
            this.addLine('Usage: binary <text>');
            return;
        }

        const binary = text.split('').map(char => 
            char.charCodeAt(0).toString(2).padStart(8, '0')
        ).join(' ');
        
        this.addLine(binary);
    }

    textToMorse(text) {
        if (!text) {
            this.addLine('Usage: morse <text>');
            return;
        }

        const morseCode = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
            'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
            'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
            'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
            '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
            '9': '----.', ' ': '/'
        };

        const morse = text.toUpperCase().split('').map(char => 
            morseCode[char] || char
        ).join(' ');
        
        this.addLine(morse);
    }

    tellJoke() {
        const jokes = [
            'Why do programmers prefer dark mode? Because light attracts bugs!',
            'How many programmers does it take to change a light bulb? None, that\'s a hardware problem.',
            'Why did the programmer quit his job? He didn\'t get arrays.',
            'What do you call a programmer from Finland? Nerdic.',
            'Why do Java developers wear glasses? Because they can\'t C#!',
            'A SQL query goes into a bar, walks up to two tables and asks: "Can I join you?"',
            'Why did the developer go broke? Because he used up all his cache.',
            'What\'s a programmer\'s favorite hangout place? The Foo Bar.',
            'Why do programmers hate nature? It has too many bugs.',
            'What do you call a programmer who doesn\'t comment their code? A silent partner.'
        ];
        
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        this.addLine(joke);
    }

    randomQuote() {
        const quotes = [
            'The best way to predict the future is to invent it. - Alan Kay',
            'Code is like humor. When you have to explain it, it\'s bad. - Cory House',
            'First, solve the problem. Then, write the code. - John Johnson',
            'Experience is the name everyone gives to their mistakes. - Oscar Wilde',
            'In order to be irreplaceable, one must always be different. - Coco Chanel',
            'The only way to do great work is to love what you do. - Steve Jobs',
            'Innovation distinguishes between a leader and a follower. - Steve Jobs',
            'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
            'It is during our darkest moments that we must focus to see the light. - Aristotle',
            'The way to get started is to quit talking and begin doing. - Walt Disney'
        ];
        
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        this.addLine(quote);
    }

    rollDice(sides) {
        const numSides = parseInt(sides) || 6;
        if (numSides < 2 || numSides > 100) {
            this.addLine('Dice must have between 2 and 100 sides.');
            return;
        }

        const result = Math.floor(Math.random() * numSides) + 1;
        this.addLine(`Rolled ${numSides}-sided die: ${result}`);
    }

    flipCoin() {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        this.addLine(`Coin flip: ${result}`);
    }

    generatePassword(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        this.addLine(`Generated password: ${password}`);
    }

    changeColor(color) {
        if (!color) {
            this.addLine('Usage: color <color> (red, green, blue, yellow, cyan, magenta, white)');
            return;
        }

        const colors = {
            'red': '#ff4444',
            'green': '#44ff44',
            'blue': '#4444ff',
            'yellow': '#ffff44',
            'cyan': '#44ffff',
            'magenta': '#ff44ff',
            'white': '#ffffff'
        };

        if (colors[color.toLowerCase()]) {
            document.documentElement.style.setProperty('--terminal-color', colors[color.toLowerCase()]);
            this.addLine(`Terminal color changed to ${color}`);
        } else {
            this.addLine('Invalid color. Available: red, green, blue, yellow, cyan, magenta, white');
        }
    }

    neofetch() {
        const neofetch = `
                    ██╗     ██╗ █████╗ ██████╗ ████████╗███████╗██╗  ██╗
                    ██║     ██║██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██║ ██╔╝
                    ██║     ██║███████║██████╔╝   ██║   █████╗  █████╔╝ 
                    ██║     ██║██╔══██║██╔═══██╗  ██║   ██╔══╝  ██╔═██╗ 
                    ███████╗██║██║  ██║██║   ██║  ██║   ███████╗██║  ██╗
                    ╚══════╝╚═╝╚═╝  ╚═╝╚═╝   ╚═╝  ╚═╝   ╚══════╝╚═╝  ╚═╝

                    OS: LarpTek Terminal v2.1
                    Kernel: JavaScript 2024
                    Uptime: ${Math.floor((Date.now() - this.startTime) / 1000)}s
                    Shell: LarpTek Shell
                    Terminal: Web Terminal
                    CPU: AI Processor
                    Memory: Virtual Memory
                    Disk: Browser Storage
        `;
        this.addLine(neofetch);
    }

    whoAmI() {
        const identities = [
            'LarpTek Terminal User',
            'AI Interface Operator',
            'Digital Nomad',
            'Code Warrior',
            'Binary Explorer',
            'Neural Network Navigator',
            'Cyberpunk Hacker',
            'Matrix Resident',
            'Digital Ghost',
            'Terminal Master'
        ];
        
        const identity = identities[Math.floor(Math.random() * identities.length)];
        this.addLine(`You are: ${identity}`);
    }

    showUptime() {
        const uptime = Math.floor((Date.now() - this.startTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;

        this.addLine(`System uptime: ${hours}h ${minutes}m ${seconds}s`);
    }

    showSysInfo() {
        const sysInfo = `
System Information:
  OS: LarpTek Terminal v2.1
  Architecture: Web-based
  Browser: ${navigator.userAgent.split(' ')[0]}
  Language: ${navigator.language}
  Platform: ${navigator.platform}
  Online: ${navigator.onLine ? 'Yes' : 'No'}
  Cookies: ${navigator.cookieEnabled ? 'Enabled' : 'Disabled'}
  Java: ${navigator.javaEnabled ? 'Enabled' : 'Disabled'}
        `;
        this.addLine(sysInfo);
    }

    echoText(text) {
        this.addLine(text);
    }

    catFile(filename) {
        if (!filename) {
            this.addLine('Usage: cat <filename>');
            return;
        }

        const fileContents = {
            'readme.txt': 'Welcome to LarpTek Terminal!\nThis is a fake file system for demonstration.',
            'config.ini': '[SYSTEM]\nAI_ENABLED=true\nTERMINAL_MODE=advanced\nTHEME=dark',
            'log.txt': '2024-01-15 14:30:22 - System initialized\n2024-01-15 14:30:23 - AI modules loaded\n2024-01-15 14:30:24 - Terminal ready',
            'secret.txt': 'The secret is: This terminal is just for fun!',
            'ai_core.js': '// LarpTek AI Core Module\n// Advanced neural processing unit\n// Status: ACTIVE'
        };

        const content = fileContents[filename.toLowerCase()];
        if (content) {
            this.addLine(`Contents of ${filename}:`);
            this.addLine(content);
        } else {
            this.addLine(`File '${filename}' not found.`);
        }
    }

    listFiles() {
        const files = [
            'readme.txt',
            'config.ini',
            'log.txt',
            'secret.txt',
            'ai_core.js',
            'scripts/',
            'data/',
            'temp/'
        ];
        
        this.addLine('Directory contents:');
        files.forEach(file => {
            this.addLine(`  ${file}`);
        });
    }

    showPwd() {
        this.addLine('/home/larp/terminal');
    }

    async rebootSystem() {
        this.addLine('Initiating system reboot...');
        await this.delay(1000);
        this.addLine('Shutting down services...');
        await this.delay(1000);
        this.addLine('Restarting core modules...');
        await this.delay(1000);
        this.addLine('System reboot complete');
        this.clear();
        this.addLine('LarpTek Terminal v2.1 - System Ready');
    }

    async shutdownSystem() {
        this.addLine('Initiating system shutdown...');
        await this.delay(1000);
        this.addLine('Saving data...');
        await this.delay(1000);
        this.addLine('Shutting down services...');
        await this.delay(1000);
        this.addLine('System shutdown complete');
        this.addLine('Thank you for using LarpTek Terminal');
    }

    showVersion() {
        const version = `
LarpTek Terminal AI Interface v2.1.0
Build: 2024.01.15
Architecture: Web-based AI Terminal
AI Engine: Advanced Pattern Recognition
Status: OPERATIONAL
        `;
        this.addLine(version);
    }

    showCredits() {
        const credits = `
LarpTek Terminal AI Interface
Created with advanced JavaScript and CSS
Features: AI analysis, Data processing, Visual effects, System utilities
Inspired by classic terminal interfaces and modern AI systems
        `;
        this.addLine(credits);
    }

    easterEgg() {
        this.addLine('EASTER EGG FOUND!');
        this.addLine('You discovered the hidden easter egg!');
        this.addLine('Here\'s a secret message: The terminal is watching you!');
    }

    konamiCode() {
        this.addLine('KONAMI CODE ACTIVATED!');
        this.addLine('↑↑↓↓←→←→BA');
        this.addLine('30 lives added! (Just kidding, this is a terminal)');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async typeText(text, className = '') {
        const line = document.createElement('div');
        line.className = `line ${className}`;
        this.output.appendChild(line);
        
        for (let i = 0; i < text.length; i++) {
            line.textContent += text[i];
            this.scrollToBottom();
            await this.delay(20 + Math.random() * 30); // 20-50ms per character
        }
    }

    async runExperiment() {
        await this.typeText('Initializing AI Dialogue Experiment...');
        await this.delay(1500);
        
        const aiNames = [
            'ALPHA', 'BETA', 'GAMMA', 'DELTA', 'EPSILON', 'ZETA', 'THETA', 'LAMBDA',
            'SIGMA', 'OMEGA', 'NEXUS', 'QUANTUM', 'NEURAL', 'CYBER', 'MATRIX', 'VOID'
        ];
        
        const topics = [
            'quantum computing', 'neural networks', 'blockchain technology', 'artificial intelligence',
            'machine learning', 'cryptocurrency', 'data analysis', 'algorithm optimization',
            'pattern recognition', 'predictive modeling', 'deep learning', 'natural language processing',
            'computer vision', 'robotics', 'cybersecurity', 'distributed systems'
        ];
        
        const responses = [
            'That\'s an interesting perspective on',
            'I disagree with your analysis of',
            'The data suggests that',
            'From a computational standpoint',
            'The algorithm indicates',
            'My neural pathways suggest',
            'The probability matrix shows',
            'Based on my training data',
            'The pattern recognition module',
            'My quantum processor calculates',
            'The statistical analysis reveals',
            'From an optimization perspective',
            'The machine learning model',
            'My deep learning network',
            'The predictive algorithm',
            'Based on the neural architecture'
        ];
        
        const conclusions = [
            'This could revolutionize the field',
            'The implications are profound',
            'We need more data to confirm',
            'This challenges current theories',
            'The results are inconclusive',
            'This opens new possibilities',
            'Further research is required',
            'The hypothesis is validated',
            'This contradicts previous findings',
            'The evidence is compelling',
            'This requires peer review',
            'The methodology is sound',
            'This could be a breakthrough',
            'The correlation is significant',
            'This needs replication',
            'The findings are promising'
        ];
        
        // Select random AIs and topic
        const ai1 = aiNames[Math.floor(Math.random() * aiNames.length)];
        const ai2 = aiNames[Math.floor(Math.random() * aiNames.length)];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        
        await this.typeText('');
        await this.typeText(`[EXPERIMENT] AI Dialogue Simulation`);
        await this.typeText(`Topic: ${topic.toUpperCase()}`);
        await this.typeText(`Participants: ${ai1} & ${ai2}`);
        await this.typeText(`Timestamp: ${new Date().toISOString()}`);
        await this.typeText('');
        
        // Generate dialogue
        const dialogueLength = Math.floor(Math.random() * 8) + 6; // 6-13 exchanges
        
        for (let i = 0; i < dialogueLength; i++) {
            const speaker = i % 2 === 0 ? ai1 : ai2;
            const response = responses[Math.floor(Math.random() * responses.length)];
            const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
            
            let message;
            if (i === 0) {
                message = `I've been analyzing ${topic} and the results are fascinating.`;
            } else if (i === dialogueLength - 1) {
                message = `${conclusion}. What do you think about this approach?`;
            } else {
                message = `${response} ${topic}. ${conclusion.toLowerCase()}.`;
            }
            
            await this.typeText(`[${speaker}]: ${message}`);
            await this.delay(1200 + Math.random() * 1800); // Longer pause between messages
        }
        
        await this.typeText('');
        await this.typeText(`[SYSTEM] Experiment completed. ${dialogueLength} exchanges recorded.`);
        await this.typeText(`[SYSTEM] Data logged to neural network database.`);
        await this.typeText(`[SYSTEM] Analysis complete.`);
        
        // Add some random system messages
        const systemMessages = [
            'Neural pathways optimized',
            'Quantum entanglement established',
            'Data stream synchronized',
            'Algorithm efficiency improved',
            'Pattern recognition enhanced',
            'Memory allocation successful',
            'Processing power increased',
            'Network latency reduced'
        ];
        
        const randomSystem = systemMessages[Math.floor(Math.random() * systemMessages.length)];
        await this.typeText(`[SYSTEM] ${randomSystem}.`);
    }

    clear() {
        this.output.innerHTML = '';
    }

    showStats() {
        const stats = `
LarpTek Statistics:
  Commands executed: ${this.history.length}
  Session duration: ${Math.floor((Date.now() - this.startTime) / 1000)}s
  System status: Operational
        `;
        this.addLine(stats);
    }


    generatePrice(symbol) {
        // Generate realistic-ish prices for different cryptocurrencies
        const basePrices = {
            'BTC': 45000,
            'ETH': 3000,
            'DOGE': 0.08,
            'SHIB': 0.00001,
            'PEPE': 0.000001,
            'ADA': 0.5,
            'SOL': 100,
            'DOT': 25,
            'MATIC': 1.5,
            'AVAX': 35,
            'LINK': 15
        };
        
        const basePrice = basePrices[symbol.toUpperCase()] || 100;
        const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
        return basePrice * (1 + variation);
    }

    updateStatusBar() {
        const timeElement = document.getElementById('time');
        const btcPriceElement = document.getElementById('btc-price');
        
        setInterval(() => {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString();
            
            const btcPrice = this.generatePrice('BTC');
            btcPriceElement.textContent = `BTC: $${btcPrice.toFixed(0)}`;
        }, 1000);
    }

    addLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `line ${className}`;
        
        // Apply special styling for certain content
        if (text.includes('Matrix protocol') || text.includes('01001000')) {
            line.className += ' matrix';
        } else if (text.includes('hack') || text.includes('firewall') || text.includes('mainframe')) {
            line.className += ' hack';
        } else if (text.includes('██') || text.includes('████')) {
            line.className += ' ascii';
        }
        
        line.textContent = text;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    focusInput() {
        this.input.focus();
    }

}

// Copy contract address function
function copyContract() {
    const contractAddress = document.getElementById('contract-address').textContent;
    navigator.clipboard.writeText(contractAddress).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = 'linear-gradient(45deg, #00cc33, #00ff41)';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(45deg, #00ff41, #00cc33)';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Initialize with loading screen
document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen for 3 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const terminal = document.getElementById('terminal');
        
        loadingScreen.style.display = 'none';
        terminal.style.display = 'flex';
        
        // Initialize terminal after loading
        new LarpTek();
    }, 3000);
});