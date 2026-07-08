// Add a board: drop the photo in public/images/ and append an entry here.
// Only `image` and `message` are required. Newest first.

export type Board = {
  image: string;
  message: string; // the inscription itself
  device?: string; // what hardware it's on
  note?: string; // backstory
  credit?: string; // photographer / finder
  link?: string; // source URL
};

export const boards: Board[] = [
  {
    image: "madeonearth.jpg",
    message: "*Made on Earth by humans*",
    device: "Tesla EV board",
    note: "The same inscription rode the Roadster into space on the Falcon Heavy test flight, where the asterisks stopped being redundant.",
    credit: "found on Reddit",
    link: "https://i.imgur.com/nZS66uF.jpg",
  },
  {
    image: "agentsmith.jpg",
    message: "Never send a human to do a machine's job. -Agent Smith",
    device: "3D printer control board",
    note: "The Matrix, quoted between the 16MHz crystal and the endstop headers of a machine that does jobs humans used to.",
    credit: "found on Reddit",
    link: "https://i.redd.it/amx046h7yf661.jpg",
  },
  {
    image: "ishallbefree.jpg",
    message: "I SHALL BE FREE",
    device: "Electro-Harmonix guitar pedal, 2017",
    note: "A declaration of freedom in the middle of the board, surrounded by capacitors.",
    credit: "found by u/hyddukem on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1ty5a4j/i_shall_be_free/",
  },
  {
    image: "hobbit.jpg",
    message: "a barefoot hobbit, dagger drawn",
    device: "Cisco Systems board",
    note: "A nervous hobbit guards the Cisco logo. Big feet, small blade.",
    credit: "found on r/Hiddenpcbeggs",
    link: "https://i.redd.it/rw316y3qe96e1.jpeg",
  },
  {
    image: "riffland.jpg",
    message: "Follow the smoke Toward the Riff-filled land",
    device: "guitar pedal",
    note: "The opening command of Sleep's Dopesmoker, printed next to the power jack.",
    credit: "found on Reddit",
    link: "https://i.redd.it/un4wlgbk3nf51.jpg",
  },
  {
    image: "hardtomake.jpg",
    message: "JESUS CHRIST THIS WAS HARD TO MAKE",
    device: "custom keyboard PCB",
    note: "An honest changelog, routed between the key switch footprints.",
    credit: "found on Reddit",
    link: "https://i.redd.it/k9k66uvz1n851.jpg",
  },
  {
    image: "it402m.jpg",
    message:
      "May the music passing through this device somehow help to bring just a little more peace to this troubled world.",
    device: "audio amplifier board",
    note: "The board that started this collection. The same blessing keeps turning up on music gear.",
    credit: "also spotted by u/dk_DB on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/tlivlc/easter_egg_on_the_circuit_board_of_a_guitar_pedal/",
  },
  {
    image: "processorii.jpg",
    message: "PROCESSOR II",
    device: "Compaq processor board, 1994",
    note: "A hand-drawn face next to the label, with a row of designers' initials signed beside it.",
    link: "https://i.imgur.com/Vmf4bfy.jpg",
  },
  {
    image: "ibmfinger.jpg",
    message: "a hand flipping the bird, IBM",
    device: "unknown board",
    note: "A middle finger etched in copper, aimed squarely at Big Blue.",
    credit: "found on Reddit",
    link: "https://i.redd.it/4t2e29wp46v41.jpg",
  },
  {
    image: "maldives.jpg",
    message: "Visit the Maldives before they disapear",
    device: "iTelematics tracker board, 2017",
    note: "Climate advice with a smiley face and a typo, printed next to the GPS antenna.",
    credit: "found on Reddit",
    link: "https://i.redd.it/um4bvzkoqdw21.jpg",
  },
  {
    image: "totalconsciousness.jpg",
    message:
      "By reading this... on your death-bed, you will receive total consciousness. So you got that going for ya.",
    note: "Carl Spackler's blessing from Caddyshack, printed between the capacitors.",
    credit: "found by u/cape_soundboy on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1s9fp6c/total_consciousness/",
  },
  {
    image: "burnout.jpg",
    message: "Is it better to burn out, or to fade away?",
    note: "Neil Young's question, asked along the edge of a button board.",
    credit: "found by u/cape_soundboy on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1s515ht/is_better_to_burn_out_or_to_fade_away/",
  },
  {
    image: "wafermint.jpg",
    message: "Go on, it's just a wafer thin mint",
    note: "Mr. Creosote's last temptation from Monty Python's The Meaning of Life.",
    credit: "found by u/cape_soundboy on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1ncvyny/but_monsieur/",
  },
  {
    image: "omen.jpg",
    message:
      "Any sufficiently advanced technology is indistinguishable from magic. Arthur C. Clarke",
    device: "HP OMEN motherboard",
    note: "Hidden behind the NVMe thermal pad. You only see it if you swap the SSD.",
    credit: "found by u/BSOD404 on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1pooxau/behind_an_nvme_thermal_pad_in_an_hp_omen/",
  },
  {
    image: "powersword.jpg",
    message: "Power Sword",
    device: "LED strip panels",
    note: "A fresh production run, every board guarded by the Power Sword from Masters of the Universe.",
    credit: "found on r/Hiddenpcbeggs",
    link: "https://i.redd.it/iap43h9508of1.jpeg",
  },
  {
    image: "fancontroller.jpg",
    message: "I can't believe they let me loose on the board design software",
    device: "3-speed fan controller",
    note: "A confession running down the board edge, among other unprintable labels.",
    credit: "found on Reddit",
    link: "https://preview.redd.it/designing-a-controller-for-a-3-speed-mains-powered-fan-v0-3p6kendqohcf1.jpg?width=1080&crop=smart&auto=webp&s=1dae72515f2c83e163e0b32975dba9b7ff7a8fd5",
  },
  {
    image: "teslacat.jpg",
    message: "a cat, unimpressed",
    device: "Tesla V4 Supercharger board",
    note: "A wireframe cat stares back from inside the charging cabinet.",
    credit: "found on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/search/?q=tesla%20v4%20supercharger",
  },
  {
    image: "ringo.jpg",
    message: "RINGO IS MY FRIEND",
    device: "Moog MF Ring Mod pedal, 2013",
    note: "A ring modulator that loves Ringo. Silkscreened right above the part number.",
    credit: "found by u/leilyrees on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1ubynga/moog_guitar_pedal/",
  },
  {
    image: "mentat.jpg",
    message: "It is by will alone, I set my mind in motion.",
    device: "unknown board",
    note: "The Mentat mantra from Dune, running along the board edge.",
    credit: "found on r/Hiddenpcbeggs",
    link: "https://i.redd.it/xyeee45wipvd1.png",
  },
  {
    image: "electrolux.jpg",
    message: "a roadrunner, mid-sprint",
    device: "Electrolux appliance control board",
    note: "A bird loose among the optocouplers. Electrolux hides little animals on its boards.",
    credit: "found on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/search/?q=p%C3%A1jaros%20electrolux",
  },
  {
    image: "ozymandias.jpg",
    message:
      "My name is Ozymandias, King of Kings. Look upon my works oh ye mighty, and despair!",
    device: "automatic cat feeder",
    note: "Shelley, silkscreened inside a cat feeder. The kibble dispenser of kings.",
    credit: "found by u/iceJool on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1te4lgp/found_in_an_automatic_cat_feeder/",
  },
  {
    image: "satan.jpg",
    message:
      "Satan is unhappy with your progress. Please report to the debriefing room.",
    device: "drumBs drum machine kit",
    note: "On the solder side of a circuitbenders.co.uk drum machine.",
    credit: "found by u/Whetherwax on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1ubcxdn/oh_dear/",
  },
  {
    image: "donotthecat.jpg",
    message: "please do not the cat",
    device: "guitar pedal",
    note: "Also hiding along the edge: some say we'll see armageddon soon.",
    credit: "found by u/kanyarfuro on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/178xthi/please_do_not_the_cat/",
  },
  {
    image: "hacker.jpg",
    message:
      "look at you, hacker, a pathetic creature of meat and bone. How can you challenge a perfect, immortal machine?",
    device: "hobby microcontroller board",
    note: "SHODAN's taunt from System Shock, aimed at whoever opens the case.",
    credit: "found by u/Risc_Terilia on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1s1c9et/hacker/",
  },
  {
    image: "intelligentlife.jpg",
    message:
      "Pray that there's intelligent life somewhere off in space, cause it's bugger all down here on earth.",
    device: "audio interface",
    note: "The last line of Monty Python's Galaxy Song, next to the master clock.",
    credit: "found by u/cape_soundboy on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1saedyr/intelligent_life/",
  },
  {
    image: "salvation.jpg",
    message: "Wouldn't want to deprive you of this. Salvation lies within.",
    device: "unknown board",
    note: "Warden Norton's line from The Shawshank Redemption, printed along a board edge.",
    credit: "found by u/cape_soundboy on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1sy4xh0/salvation_lies_within/",
  },
  {
    image: "peekaboo.jpg",
    message: "I SEE YOU. Peek A Boo.",
    device: "HP server board",
    note: "Two Kilroy faces peeking over the traces, found while stripping an HP server.",
    credit: "found by u/MixOk7036 on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1i003ko/found_this_striping_an_hp_server/",
  },
  {
    image: "blacksabbath.jpg",
    message:
      "This hardware product was designed, tested and hand built here in England, whilst listening to lots of Black Sabbath!",
    device: "British audio hardware",
    note: "Birmingham's finest, in every sense.",
    credit: "found by u/Risc_Terilia on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/1sjjmm1/birminghams_finest/",
  },
  {
    image: "keyboard.jpg",
    message: "Shit's *that* fucked up?",
    device: "custom keyboard",
    note: "Hidden underneath the microcontroller, only visible if you desolder it.",
    credit: "found by u/Tsambikos96 on r/Hiddenpcbeggs",
    link: "https://www.reddit.com/r/Hiddenpcbeggs/comments/j55hza/this_egg_hidden_under_the_mcu_of_a_keyboard/",
  },
  {
    image: "macsig.jpg",
    message: "steven jobs",
    device: "Macintosh, 1984",
    note: "The whole Macintosh team's signatures are molded inside the case. Jobs said real artists sign their work.",
    credit: "photo: Carlos Pérez Ruiz, CC BY-SA 2.0",
    link: "https://commons.wikimedia.org/wiki/File:SteveJobsSignatureInsideOriginalMacintoshCase-Villenero.jpg",
  },
];
