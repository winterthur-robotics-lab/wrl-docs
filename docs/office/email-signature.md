# Email signature

**This is the signature to use** — one design, for everyone, in every mail client.
Fill in the fields below, press **Copy signature**, and paste it into your client.

It is deliberately **text only**: no logo image, no banner, no tracking pixel.
Nothing breaks when a thread is forwarded, and dark mode works automatically.

## Build yours

<div class="sig-builder" data-sig-builder>
  <div class="sig-fields">
    <label class="sig-field">
      <span class="sig-field__label">Name</span>
      <input type="text" data-sig-input="name" placeholder="Pascal Sager" autocomplete="name" spellcheck="false">
    </label>
    <label class="sig-field">
      <span class="sig-field__label">Role <span>optional</span></span>
      <input type="text" data-sig-input="role" placeholder="Board member" autocomplete="organization-title" spellcheck="false">
    </label>
    <label class="sig-field">
      <span class="sig-field__label">Email</span>
      <input type="email" data-sig-input="email" placeholder="pascal@winterthur-robotics-lab.ch" autocomplete="email" spellcheck="false">
    </label>
    <label class="sig-field">
      <span class="sig-field__label">Phone <span>optional</span></span>
      <input type="tel" data-sig-input="phone" placeholder="+41 79 768 43 21" autocomplete="tel" spellcheck="false">
    </label>
  </div>
  <div class="sig-previews">
    <div class="sig-card">
      <p class="sig-cap">Light client</p>
      <div class="sig-stage" data-sig-preview="light"></div>
    </div>
    <div class="sig-card sig-card--dark">
      <p class="sig-cap">Dark client</p>
      <div class="sig-stage" data-sig-preview="dark"></div>
    </div>
  </div>
  <div class="sig-actions">
    <button type="button" class="sig-btn" data-sig-action="copy" title="Copy the finished signature as formatted HTML, ready to paste into your mail client">Copy signature</button>
    <button type="button" class="sig-btn sig-btn--ghost" data-sig-action="raw" title="Copy the HTML source as plain text">Copy raw HTML</button>
    <button type="button" class="sig-btn sig-btn--ghost" data-sig-action="download" title="Download WinterthurRoboticsLab.htm for Classic Outlook">Download .htm</button>
    <span class="sig-status" data-sig-status role="status" aria-live="polite"></span>
  </div>
</div>

!!! note "All of this happens in your browser"
    Nothing is sent anywhere. What you type is kept in this browser's local storage
    so the page remembers you the next time you open it.

| Field | What to put in it |
|---|---|
| **Name** | Required. |
| **Role** | Optional. Keep it short — it sits beside your name. Leave it empty if your title is long. |
| **Email** | Pre-filled from your first name (`firstname@winterthur-robotics-lab.ch`). Correct it once if yours differs. |
| **Phone** | Optional. International format with spaces (`+41 79 123 45 67`). |

The lab name, website and address are fixed and the same for everyone.

## Paste it into your mail client

=== "Gmail"

    1. **Settings** (the gear) → **See all settings** → **Signature**.
    2. **Create new**, name it `WRL`, click into the box and paste.
    3. Set it as the default for new emails and for replies, then scroll to the
       bottom and press **Save changes** — Gmail discards the signature if you
       leave the page without saving.

=== "New Outlook / Outlook web"

    **Settings** → **Mail** → **Compose and reply** → paste into a new signature,
    name it `WRL`, and select it for new messages and replies/forwards.

=== "Classic Outlook (Windows)"

    Use the file rather than the clipboard:

    1. Press **Download .htm** above.
    2. Move it into `%APPDATA%\Microsoft\Signatures\`.
    3. Restart Outlook, then pick `WRL` under **File → Options → Mail → Signatures**.

=== "Apple Mail"

    **Settings** → **Signatures** → paste, then untick **Always match my default
    message font**.

!!! warning "Outlook shows me the HTML source"

    The clipboard held plain text. **Copy raw HTML** does that on purpose — it is
    for editing the markup. Use **Copy signature**, which writes a `text/html`
    clipboard entry that Outlook renders. If it still pastes as text, paste into
    an email body first, select it there, copy again, then paste into the
    signature editor. Or use the Download route for Classic Outlook.
