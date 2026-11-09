/* Email signature generator for office/email-signature.md.
 *
 * Adapted from the Binabik version. Everything is inline-styled and there are
 * no images and no webfonts, because mail clients strip stylesheets, prompt
 * before loading remote images, and never fetch a webfont.
 *
 * Loaded via mkdocs.yml extra_javascript; document$ re-runs it after an
 * instant-navigation page swap, where DOMContentLoaded never fires again.
 */
(function () {
  "use strict";

  /* Fixed for everyone — the parts that make it a lab signature. */
  var ADDRESS = ["Technoparkstrasse 2", "8406 Winterthur, Switzerland"];
  var SITE     = "winterthur-robotics-lab.ch";
  var DOMAIN   = "winterthur-robotics-lab.ch";
  var LINKEDIN = "https://www.linkedin.com/company/winterthur-robotics-lab";
  var FONT    = "'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',Arial,sans-serif";
  var STORE   = "wrl.signature.v1";
  var FIELDS  = ["name", "role", "email", "phone"];

  // ------------------------------------------------------------------ helpers

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function nbsp(value) {
    return esc(value).replace(/ /g, "&nbsp;");
  }

  function telHref(value) {
    return esc(value.replace(/[^\d+]/g, ""));
  }

  /* Email convention: firstname@winterthur-robotics-lab.ch, accents folded. */
  function emailFor(name) {
    var first = String(name).trim().split(/\s+/)[0] || "";
    var slug = first
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ß/g, "ss")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    return slug ? slug + "@" + DOMAIN : "";
  }

  // ---------------------------------------------------------- the signature

  var NORMAL = "letter-spacing:normal;word-spacing:normal;";

  function link(href, label, bold) {
    return (
      '<a href="' + href + '" style="color:#0D1011;text-decoration:none;' +
      NORMAL + (bold ? "font-weight:600;" : "") + '">' + label + "</a>"
    );
  }

  function row(parts) {
    var bullet = '<span style="color:#C4CAC7;padding:0 3px;">&#8226;</span>';
    return (
      '      <div style="font-size:13px;line-height:20px;color:#0D1011;' +
      NORMAL + '" class="sig-text">\n        ' +
      parts.join("\n        " + bullet + "\n        ") +
      "\n      </div>"
    );
  }

  function buildSignature(f) {
    var name = f.name || "Your Name";
    var role = f.role
      ? '<span style="font-size:11px;font-weight:600;letter-spacing:1.4px;color:#6E7679;" ' +
        'class="sig-muted">&nbsp;&nbsp;&nbsp;' + esc(f.role) + "</span>"
      : "";

    var reach = [];
    if (f.email) reach.push(link("mailto:" + esc(f.email), esc(f.email)));
    if (f.phone) reach.push(link("tel:" + telHref(f.phone), nbsp(f.phone)));

    var web = [link("https://" + SITE, SITE, true), link(LINKEDIN, "LinkedIn")];

    var block = [
      '      <div style="font-family:' + FONT +
        ";font-size:17px;line-height:24px;" + NORMAL +
        'color:#0D1011;padding-bottom:4px;" class="sig-name">' +
        '<span style="font-weight:600;letter-spacing:-0.2px;">' + esc(name) + "</span>" +
        role + "</div>",
    ];
    if (reach.length) block.push(row(reach));
    block.push(row(web));
    ADDRESS.forEach(function (line, index) {
      block.push(
        '      <div style="font-size:12px;line-height:18px;color:#6E7679;' +
          NORMAL + (index === 0 ? "padding-top:3px;" : "") + '" class="sig-muted">' +
          line + "</div>"
      );
    });

    /* Both tables carry class="sig-table" to prevent the docs theme from
       styling them. See the Binabik sig for the full TRACKING explanation. */
    return (
      '<table class="sig-table" role="presentation" cellpadding="0" cellspacing="0" ' +
      'border="0" style="border-collapse:collapse;mso-table-lspace:0pt;' +
      'mso-table-rspace:0pt;-webkit-text-size-adjust:100%;">\n' +
      "  <tr>\n" +
      '    <td style="padding:0 0 6px 0;font-family:' + FONT +
        ";font-size:12px;line-height:16px;" + NORMAL +
        'color:#0D1011;" class="sig-name">' +
        '<span style="font-weight:700;letter-spacing:2.5px;">WINTERTHUR ROBOTICS LAB</span></td>\n' +
      "  </tr>\n" +
      "  <tr>\n" +
      '    <td style="padding:0;">\n' +
      '      <table class="sig-table" role="presentation" cellpadding="0" ' +
        'cellspacing="0" border="0" style="border-collapse:collapse;">\n' +
      "        <tr>\n" +
      '          <td width="40" height="2" bgcolor="#FFD100" style="width:40px;height:2px;' +
        'line-height:2px;font-size:0;background-color:#FFD100;">&nbsp;</td>\n' +
      "        </tr>\n" +
      "      </table>\n" +
      "    </td>\n" +
      "  </tr>\n" +
      "  <tr>\n" +
      '    <td style="padding:11px 0 0 0;font-family:' + FONT +
        ";font-size:13px;line-height:20px;" + NORMAL + 'color:#0D1011;">\n' +
      block.join("\n") + "\n" +
      "    </td>\n" +
      "  </tr>\n" +
      "</table>"
    );
  }

  /* Standalone .htm file for Classic Outlook. */
  function outlookFile(signature) {
    return (
      "<!DOCTYPE html>\n" +
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
      'xmlns:w="urn:schemas-microsoft-com:office:word">\n' +
      "<head>\n<meta charset=\"utf-8\">\n" +
      '<meta name="ProgId" content="Word.Document">\n' +
      '<meta name="Generator" content="Microsoft Word">\n' +
      "<title>WRL</title>\n" +
      "<style>\n" +
      "@media (prefers-color-scheme: dark) {\n" +
      "  .sig-name, .sig-text, .sig-text a { color: #F2F4F1 !important; }\n" +
      "  .sig-muted { color: #94A3B8 !important; }\n" +
      "}\n</style>\n</head>\n" +
      '<body style="margin:0;padding:0;">\n' +
      signature + "\n</body>\n</html>\n"
    );
  }

  // ------------------------------------------------------------------- wiring

  function init(root) {
    if (root.dataset.sigReady === "1") return;
    root.dataset.sigReady = "1";

    var inputs = {};
    FIELDS.forEach(function (key) {
      inputs[key] = root.querySelector('[data-sig-input="' + key + '"]');
    });
    var mounts  = root.querySelectorAll("[data-sig-preview]");
    var buttons = root.querySelectorAll("[data-sig-action]");
    var status  = root.querySelector("[data-sig-status]");

    var emailEdited = false;
    var current = "";

    function read() {
      var f = {};
      FIELDS.forEach(function (key) {
        f[key] = inputs[key] ? inputs[key].value.trim() : "";
      });
      return f;
    }

    function save(f) {
      try {
        window.localStorage.setItem(STORE, JSON.stringify({ fields: f, emailEdited: emailEdited }));
      } catch (e) {}
    }

    function restore() {
      var raw;
      try { raw = window.localStorage.getItem(STORE); } catch (e) { return; }
      if (!raw) return;
      var saved;
      try { saved = JSON.parse(raw); } catch (e) { return; }
      if (!saved || typeof saved.fields !== "object") return;
      FIELDS.forEach(function (key) {
        if (inputs[key] && typeof saved.fields[key] === "string") {
          inputs[key].value = saved.fields[key];
        }
      });
      emailEdited = saved.emailEdited === true;
    }

    function say(msg) { if (status) status.textContent = msg; }

    function render() {
      var f = read();
      if (!emailEdited && inputs.email) {
        f.email = emailFor(f.name);
        inputs.email.value = f.email;
      }
      current = buildSignature(f);
      Array.prototype.forEach.call(mounts, function (m) { m.innerHTML = current; });
      var ready = Boolean(f.name && f.email);
      Array.prototype.forEach.call(buttons, function (b) {
        b.disabled = !ready;
        b.setAttribute("aria-disabled", String(!ready));
      });
      say(ready ? "" : "Fill in your name to copy the signature.");
      save(f);
    }

    function flash(button, label) {
      var orig = button.dataset.sigLabel || button.textContent;
      button.dataset.sigLabel = orig;
      button.textContent = label;
      window.setTimeout(function () { button.textContent = orig; }, 1500);
    }

    function copyRich(button) {
      var plain = document.createElement("div");
      plain.innerHTML = current;
      var text = (plain.innerText || plain.textContent || "").replace(/\n{2,}/g, "\n").trim();
      var written;
      if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
        written = navigator.clipboard.write([
          new window.ClipboardItem({
            "text/html":  new Blob([current], { type: "text/html" }),
            "text/plain": new Blob([text],    { type: "text/plain" }),
          }),
        ]);
      } else {
        written = Promise.reject(new Error("no ClipboardItem"));
      }
      written.then(
        function () { flash(button, "Copied"); say("Signature copied — paste it into your mail client."); },
        function () {
          var host = document.createElement("div");
          host.setAttribute("style", "position:fixed;left:-9999px;top:0;");
          host.innerHTML = current;
          document.body.appendChild(host);
          var range = document.createRange();
          range.selectNodeContents(host);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          var ok = document.execCommand("copy");
          sel.removeAllRanges();
          host.remove();
          flash(button, ok ? "Copied" : "Copy failed");
          say(ok ? "Signature copied — paste it into your mail client." : "Your browser blocked the copy.");
        }
      );
    }

    function copyRaw(button) {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        flash(button, "Copy failed");
        return;
      }
      navigator.clipboard.writeText(current).then(
        function () { flash(button, "Copied"); say("HTML source copied."); },
        function () { flash(button, "Copy failed"); say("Your browser blocked the copy."); }
      );
    }

    function download(button) {
      var blob = new Blob([outlookFile(current)], { type: "text/html" });
      var url  = URL.createObjectURL(blob);
      var a    = document.createElement("a");
      a.href = url;
      a.download = "WinterthurRoboticsLab.htm";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      flash(button, "Downloaded");
      say("WinterthurRoboticsLab.htm downloaded.");
    }

    var actions = { copy: copyRich, raw: copyRaw, download: download };

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        var action = actions[button.dataset.sigAction];
        if (action) action(button);
      });
    });

    FIELDS.forEach(function (key) {
      if (!inputs[key]) return;
      inputs[key].addEventListener("input", function () {
        if (key === "email") emailEdited = inputs.email.value.trim() !== "";
        render();
      });
    });

    restore();
    render();
  }

  function boot() {
    var root = document.querySelector("[data-sig-builder]");
    if (root) init(root);
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(boot);
  } else {
    document.addEventListener("DOMContentLoaded", boot);
  }
})();
