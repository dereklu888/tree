// Useful information at www.puzzlr.org/force-graphs-with-d3/

// SVG frame dimensions
var w = window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

// Subtract 15px from width as approximation of svg margins
w = w - 15;

var h = window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

// Set svg height as 75% of window height
h = Math.floor(h * 0.75);

// Node selected border color
var strokeWidth = 1.25;
var strokeColor = "white";

// Border properties
var borderOn = true;
var borderColor = "#707070";
var borderWidth = 5;

// Graph frame properties
var frameColor = "none";

// Limits for zooming
// First value is for zoom out,
//  smaller value allows greater zoom out
// Second value is for zoom in,
//  reater value allows greater zoom in
var zoomLimits = [0.5, 4];

// Spacing of labels from node
var labelSpacingX = 12;
var labelSpacingY = 4;

// Color of text
var textColor = "lightgrey";
var backgroundColor = "#202020";

// Repulsiveness of nodes
var nodeCharge = 65;

// For future use
var storedColor = "#202020";

// Text display variables
var initialText = "Select node to begin. (Press 'R' to reset zoom)";
var initialDesc = "";

// Nodes information
var nodes_data = [{
    "name": "Computer Threats",
    "type": "Malware",
    "description": ""
  },
  {
    "name": "General Malware",
    "type": "Malware",
    "description": "Software that is design to cause harm to a user's system."
  },
  {
    "name": "Social Engineering",
    "type": "Malware",
    "description": "Strategies that take advantage of human behavior to steal information or download malware."
  },

  {
    "name": "Trojan",
    "type": "Malware",
    "description": "Malware that pretends to be a useful or legitimate program, but in reality causes harm or makes the computer vulnerable."
  },
  {
    "name": "Ransomware",
    "type": "Malware",
    "description": "Malware that locks a user from accessing his or her data and attempts to extort money from the user in exchange for access."
  },
  {
    "name": "Backdoors",
    "type": "Malware",
    "description": "Malware that creates more vulnerabilities in a user’s system which allows for the introduction of malware later on."
  },
  {
    "name": "Rootkits",
    "type": "Malware",
    "description": "Malware that is able to modify the user’s operating system so that it remains hidden from the user, allowing it to run malicious code without detection."
  },
  {
    "name": "Worm",
    "type": "Malware",
    "description": "Malware that replicates itself across a network of computers in order to have a larger effect with whatever purpose it is trying to achieve."
  },
  {
    "name": "Keylogger",
    "type": "Malware",
    "description": "A keylogger records the keystrokes of a user, allowing it to access important and personal information such as credit card information, bank information, passwords, etc."
  },
  {
    "name": "Bot (Botnet)",
    "type": "Malware",
    "description": "A bot is a computer that has been infected with malicious code that, when paired with a large amount of other bots (a botnet), can be used to execute distributed denial of service attacks (DDoS attacks) or email spam."
  },
  {
    "name": "Rogue Security Software",
    "type": "Malware",
    "description": "A type of program that pretends to detect and remove malware for a fee. It claims to scan for malware but rather shows you fake detections and warnings, telling you that you need to pay to register the software or remove the fake threats from your PC."
  },
  {
    "name": "Macro Malware",
    "type": "Malware",
    "description": "Malware that takes advantage of the feature in Microsoft Office which allows you to automate certain tasks (Macros) by using it to download threats onto the user’s computer. These are usually sent as Microsoft Office attachments to emails which offers the user a sum of money and tells them that all they have to do is open the document for more details."
  },
  {
    "name": "Wiper",
    "type": "Malware",
    "description": "Malware that wipes a computer’s hard drive. Usually used in conjunction with other malware, for example, a ransomware that would threaten to wipe the hard drive if the condition was not met."
  },
  {
    "name": "Viruses",
    "type": "Malware",
    "description": "Software that self replicates and attempts to spread to other computers. Not all viruses carry malicious payloads, though most are associated with other types of malware."
  },
  {
    "name": "Bootkits",
    "type": "Malware",
    "description": "Malware that conceals itself or executes in the boot sector, making it difficult to prevent. The boot sector is automatically executed at startup, allowing malicious programs to be run without usual operating system or antivirus protections."
  },
  {
    "name": "Vulnerability",
    "type": "Malware",
    "description": "Potential exploit from errors or bugs in software that malware can use to create harmful effects, often serving as an entrance for malware to infect computers."
  },

  {
    "name": "Potentially Unwanted Programs",
    "type": "Malware",
    "description": "Programs that don’t classify as malware, but can create harms to computers. These programs are capable of slowing down computers as well as creating annoyances for the user."
  },
  {
    "name": "Spyware",
    "type": "Malware",
    "description": "Software that collects user information after being installed on a computer. Often unnoticed, spyware sends information back to the attacker, often used to gain sensitive data such as passwords."
  },
  {
    "name": "Adware",
    "type": "Malware",
    "description": "Software used to display unwanted advertisements on computers, gaining revenue for the attacker."
  },
  {
    "name": "Browser Hijacking",
    "type": "Malware",
    "description": "Malware that modifies users browser settings without permission. This is usually used to increase page visits for the owners website or to produce ad revenue. Often times used in conjunction with keyloggers to gather personal information such as access to emails and bank accounts."
  },
  {
    "name": "Bloatware",
    "type": "Malware",
    "description": "Programs, often bundled or preinstalled on computers/devices, that slow down computers with unwanted functions."
  },

  {
    "name": "Phishing Emails",
    "type": "Scam",
    "description": "Emails that appear to be coming from legitimate businesses offering services and deals that are often too good to be true, with the goal of either scamming money from the host or infecting the host with some sort of virus or keylogger to get other personal information from him or her."
  },
  {
    "name": "Tech Support Scams",
    "type": "Scam",
    "description": "Most tech support scams start with pop-ups that say that the user’s computer has been infected with some sort of virus and the only way to remove it is to call their number. When called, the user is greeted by someone who says they are from a reputable company like Apple or Microsoft and asks for control of the user’s computer in order to help them, when in reality it allows the scammer to steal their personal information."
  },

  {
    "name": "Pharming",
    "type": "Cyber Attack",
    "description": "A cyber attack that is intended to redirect from a genuine website to a fake website. Is generally used with malware to alter host files to ensure a redirect, or exploiting vulnerabilities in DNS servers."
  },
  
  {
    "name": "Email Hijacking",
    "type": "Cyber Attack",
    "description": "Stolen or compromised email accounts are used to spread spam or malicious software. Email senders often appear trusted and use this to persuade users to open and install disguised malware or give away personal information."
  }

];

//  var rand_nodes = [];

// Links information
var link_data = [{
    "source": "General Malware",
    "target": "Computer Threats",
    "type": "A"
  },
  {
    "source": "Social Engineering",
    "target": "Computer Threats",
    "type": "A"
  },

  {
    "source": "Trojan",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Ransomware",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Backdoors",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Rootkits",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Worm",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Keylogger",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Bot (Botnet)",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Rogue Security Software",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Macro Malware",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Wiper",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Viruses",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Bootkits",
    "target": "General Malware",
    "type": "A"
  },
  {
    "source": "Vulnerability",
    "target": "General Malware",
    "type": "A"
  },

  {
    "source": "Potentially Unwanted Programs",
    "target": "Computer Threats",
    "type": "A"
  },
  {
    "source": "Browser Hijacking",
    "target": "Potentially Unwanted Programs",
    "type": "A"
  },
  {
    "source": "Adware",
    "target": "Potentially Unwanted Programs",
    "type": "A"
  },
  {
    "source": "Spyware",
    "target": "Potentially Unwanted Programs",
    "type": "A"
  },
  {
    "source": "Bloatware",
    "target": "Potentially Unwanted Programs",
    "type": "A"
  },

  {
    "source": "Phishing Emails",
    "target": "Social Engineering",
    "type": "A"
  },
  {
    "source": "Tech Support Scams",
    "target": "Social Engineering",
    "type": "A"
  },
  {
    "source": "Pharming",
    "target": "Social Engineering",
    "type": "A"
  },
  {
    "source": "Email Hijacking",
    "target": "Social Engineering",
    "type": "A"
  }
];

//  var rand_links = [];

//  makeRandNodes(50);
//  makeRandLinks();

//  var nodes_data = rand_nodes;
//  var link_data = rand_links;

// Force graph
var svg2 = d3.select("body")
  .append("svg")
  .attr("width", 1000)
  .attr("height", h)
  .style("text-align", "center")
  .call(d3.zoom().on("zoom", zoom_actions));



// Border draw
if (borderOn) {
  var rect = svg2.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 1000)
    .attr("height", h)
    .attr("stroke", borderColor)
    .attr("stroke-width", borderWidth)
    .attr("fill", frameColor);
}



d3.select("body").style("background-color", backgroundColor);


var simulation = d3.forceSimulation()
  .nodes(nodes_data);

// Used to store currently selected node
var past = null;

// Text objects for displaying selected node data
var detailLabel = d3.select("body").append("p").text(initialText).attr("class", "desc").style("color", textColor);
var detailLabelDesc = d3.select("body").append("p").text(initialDesc).attr("class", "desc").style("color", textColor);

// Set repulsiveness force, charge strength
simulation.force("charge_force", d3.forceManyBody()
  .strength(-nodeCharge));

var link_force = d3.forceLink(link_data)
  .id(function(d) {
    return d.name;
  });

simulation.force("links", link_force);
simulation.force("links", d3.forceLink().links(link_data)
  .distance(80));
simulation.force("separation", d3.forceLink().strength(0.025));
simulation.force("charge", d3.forceManyBody().strength(-200));
simulation.force("clipping", d3.forceCollide().radius(12));
simulation.force("center", d3.forceCenter(1000 / 2, h / 2));
// Draw links
var link = svg2.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(link_data)
  .enter()
  .append("line")

  .attr("stroke-width", 2);

// Create label + node group
var gnodes = svg2.selectAll("g.gnode")
  .data(nodes_data)
  .enter()
  .append("g")
  .classed("gnode", true);

// Draw labels
var labels = gnodes.append("text")
  .attr("class", "unselectable")
  .text(function(d) {
    return d.name;
  })
  .style("fill", textColor);


var pastname = "start";

// Draw nodes
var node = gnodes.append("circle")
  .attr("class", "node")
  .attr("r", 12)
  .attr("fill", function(d) {
    // Set node color based on name length
    // Should be changed later
    /*if(d.name.length > 7) {
      return "pink";
    } else if(d.name.length > 4) {
      return "orange";
    }
    return "red";*/
    return '#' + Math.random().toString(16).substr(-6);
  })
  // Select and on click node actions
  .on("mousedown", function(d) {
    // Unselect previous node if selected
    if (past != null && pastname != d.name) {
      past.style("stroke-width", 0);
    }

    if (pastname != d.name || pastname == "start") {
      detailLabel.remove();
      detailLabelDesc.remove();

      // Add border to selected node
      past = d3.select(this)
        .style("stroke", strokeColor)
        .style("stroke-width", strokeWidth);
      pastname = d.name;

      // Set text
      detailLabel = d3.select("body").append("p").text("Selected node: " + d.name).attr("class", "desc").style("color", textColor);
      detailLabelDesc = d3.select("body").append("p").text(d.description).attr("class", "desc").style("color", textColor);
      $("p").hide();
      $("p").fadeIn(1000);

    }

  });

simulation.on("tick", tickActions);

// Zoom instanstiation
var zoom_handler = d3.zoom()
  .scaleExtent(zoomLimits)
  .on("zoom", zoom_actions);

// Call zoom on svg frame
svg2.call(zoom_handler);

// Set drag handlers
var drag_handler = d3.drag()
  .on("start", drag_start)
  .on("drag", drag_drag)
  .on("end", drag_end);

drag_handler(node);

window.onkeyup = function(e) {
  var key = e.key.toUpperCase();

  if (key == 'R') {
    svg2.call(zoom_handler.transform, d3.zoomIdentity.scale(1));
  }
};

// Random text functions for testing
function makeRandText(count) {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < count; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function makeRandSentence(count) {
  var text = "";
  var maxWordLen = 12;
  var maxWordCount = 12;

  var words;

  for (var i = 0; i < count; i++) {
    words = Math.ceil(Math.random() * maxWordCount);
    for (var j = 0; j < words; j++) {
      text += makeRandText(Math.floor(Math.random() * maxWordLen)) + " ";
    }
    text = text.substring(0, text.length - 2);
    text += ". ";
  }

  return text;
}

function makeRandNodes(count) {
  var values;
  for (var i = 0; i < count; i++) {
    //values = {"name": makeRandText(10), "sex": Math.floor(Math.random * 2) = 0 ? 'M' : ' F'};
    values = {
      "name": makeRandText(Math.ceil(Math.random() * 10))
    };
    rand_nodes.push(values);
  }
}

function makeRandLinks() {
  var num = Math.floor(rand_nodes.length * 1.25);
  var s;
  var t;
  var values;
  for (var i = 0; i < num; i++) {
    s = Math.floor(Math.random() * rand_nodes.length);
    t = Math.floor(Math.random() * rand_nodes.length);
    while (s == t) {
      t = Math.floor(Math.random() * rand_nodes.length);
    }
    values = {
      "source": rand_nodes[s].name,
      "target": rand_nodes[t].name
    };
    rand_links.push(values);
  }
}

function makeRandColor() {
  var c = '';
  while (c.length < 7) {
    c += (Math.random()).toString(16).substr(-6).substr(-1);
  }
  return '#' + c;
}


// Tick handler
function tickActions() {
  // Update node position
  node
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });

  // Update link position
  link
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  // Update link position
  labels
    .attr("x", function(d) {
      return d.x + labelSpacingX;
    })
    .attr("y", function(d) {
      return d.y + labelSpacingY;
    });
}

// Drag handlers
function drag_start(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function drag_drag(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function drag_end(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

// Zoom handler
function zoom_actions() {
  node.attr("transform", d3.event.transform);
  link.attr("transform", d3.event.transform);
  labels.attr("transform", d3.event.transform);
}
