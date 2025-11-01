// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  return `AXION MISSION CONTROL - DIRECTIVES:

'problem'............. Why the $44B BI market is broken.
'solution'............ (Alias for 'demo')
'intel'............... Our competitive strategy.
'demo'................ Run a live simulation of the Axion agent crew.
'request_access'...... Join the private YC beta.
'help'................ Shows this list.
'clear'............... Clears the screen.`;
};



// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}. 
Welcome to my website!
More about me:
'sumfetch' - short summary.
'resume' - my latest resume.
'readme' - my github readme.`;
};

// Axion Mission Commands
export const problem = async (args: string[]): Promise<string> => {
  return `THE PROBLEM: Businesses are drowning in data they can't use.

1. STATIC DASHBOARDS (Tableau, Power BI): Are history books. They are slow, passive, and can't handle real-time data or large datasets. They tell you *what* happened yesterday, forcing you to guess *why*.

2. COMPLEX TOOLKITS (Salesforce Agentforce): Are 'walled gardens.' They are expensive, require months of integration, and lock you into one vendor's ecosystem.

THE RESULT: 95% of enterprise GenAI investment has delivered ZERO return on investment.

BI is broken. Axion is the solution. (Type 'solution' or 'demo')`;
};

export const solution = async (args: string[]): Promise<string> => {
  return '__DEMO_START__';
};

export const vision = async (args: string[]): Promise<string> => {
  return `EXECUTING... QUERY: The end of dashboards.

ANALYSIS: Axion is the shift from passive data analysis to active, autonomous operations. We are building the AI brain for the enterprise. This is the future.`;
};

export const intel = async (args: string[]): Promise<string> => {
  return `TARGET: Tableau / Power BI STATUS: Obsolete VULNERABILITY: They are passive visualization tools, not action platforms. They are the 'dashboard' paradigm. Axion is the 'autonomous agent' paradigm.

TARGET: Salesforce Agentforce STATUS: Trapped VULNERABILITY: A complex, expensive toolkit, not a product. Their architecture is a 'walled garden' built to sell more Salesforce. Axion is platform-agnostic, deploys in minutes, and is built for action, not integration projects.

AXION'S SECRET: We are not a better dashboard or a complex toolkit. We are the first true Autonomous Operations *Product*. We win by being simple, fast, and open.`;
};

export const waitlist = async (args: string[]): Promise<string> => {
  return `
<div style="margin: 20px 0; padding: 20px; border: 2px solid #c0c0c0; border-radius: 4px; background-color: rgba(192, 192, 192, 0.05);">
  <p style="margin-bottom: 15px; font-weight: bold;">Join the YC private beta. Be the first to deploy an autonomous agent.</p>
  <form id="waitlist-form" style="display: flex; flex-direction: column; gap: 10px;">
    <input type="email" placeholder="Enter your email" required style="padding: 8px 12px; border: 1px solid #c0c0c0; border-radius: 3px; background-color: rgba(255,255,255,0.1); color: inherit; font-family: inherit;">
    <button type="submit" style="padding: 8px 12px; background-color: #c0c0c0; color: #000; border: none; border-radius: 3px; cursor: pointer; font-weight: bold; font-family: inherit;">Join Waitlist</button>
  </form>
  <p id="waitlist-message" style="margin-top: 10px; font-size: 0.9em; display: none;"></p>
</div>

<script>
  setTimeout(() => {
    const form = document.getElementById('waitlist-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const message = document.getElementById('waitlist-message');
        message.textContent = '✓ Thank you! Check your email to confirm.';
        message.style.display = 'block';
        message.style.color = '#A3BE8C';
        form.style.display = 'none';
      });
    }
  }, 100);
</script>
`;
};

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

// Donate
export const donate = async (args: string[]): Promise<string> => {
  return `thank you for your interest. 
here are the ways you can support my work:
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.paypal}" target="_blank">paypal</a></u>
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.patreon}" target="_blank">patreon</a></u>
`;
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

// Search
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const bing = async (args: string[]): Promise<string> => {
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Wow, really? You are using bing for ${args.join(' ')}?`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `a
bunch
of
fake
directories`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `unfortunately, i cannot afford more directories.
if you want to help, you can type 'donate'.`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

// Demo
export const demo = async (args?: string[]): Promise<string> => {
  return '__DEMO_START__';
};

// Request Access
export const request_access = async (args?: string[]): Promise<string> => {
  return '__REQUEST_ACCESS_START__';
};

// Banner
export const banner = (args?: string[]): string => {
  return `
    █████████  █████  █████ █████    ██████     ██████   █████
   ███▒▒▒▒▒███ ▒▒███ ▒▒███ ▒▒███   ███▒▒▒▒▒███ ▒▒██████ ▒▒███ 
  ▒███    ▒███  ▒▒███ ███   ▒███  ███     ▒▒███ ▒███▒███ ▒███ 
  ▒███████████   ▒▒█████    ▒███ ▒███      ▒███ ▒███▒▒███▒███ 
  ▒███▒▒▒▒▒███    ███▒███   ▒███ ▒███      ▒███ ▒███ ▒▒██████ 
  ▒███    ▒███   ███ ▒▒███  ▒███ ▒▒███     ███  ▒███  ▒▒█████ 
  █████   █████ █████ █████ █████ ▒▒▒███████▒   █████  ▒▒█████
 ▒▒▒▒▒   ▒▒▒▒▒ ▒▒▒▒▒ ▒▒▒▒▒ ▒▒▒▒▒    ▒▒▒▒▒▒▒    ▒▒▒▒▒    ▒▒▒▒▒ 



Welcome to Axion: Your Autonomous Operations Platform. Type 'help' to begin.
`;
};
