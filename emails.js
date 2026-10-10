// Envio de e-mails do site (EmailJS). Preencha as 3 chaves abaixo depois de criar a conta no emailjs.com.
// Enquanto estiverem vazias, os pedidos de kit continuam sendo salvos e aparecem no painel; só os e-mails não saem.
const EMAIL_CONFIG = {
  publicKey: "",      // EmailJS > Account > Public Key
  serviceId: "",      // EmailJS > Email Services (Gmail sagradodemimm@gmail.com)
  templateId: "",     // EmailJS > Email Templates (modelo único descrito no arquivo LEIA-ME-EMAILS)
  avisoPara: "lisboafetavares@gmail.com"   // quem recebe os avisos de kits novos e respostas
};

function emailConfigurado() { return !!(EMAIL_CONFIG.publicKey && EMAIL_CONFIG.serviceId && EMAIL_CONFIG.templateId); }

// para, nome, assunto, mensagem (texto), link e textoLink (opcionais)
async function enviarEmail(o) {
  if (!emailConfigurado()) { console.warn("E-mail não configurado (emails.js)."); return false; }
  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAIL_CONFIG.serviceId, template_id: EMAIL_CONFIG.templateId, user_id: EMAIL_CONFIG.publicKey,
        template_params: { to_email: o.para, to_name: o.nome || "", subject: o.assunto, message: o.mensagem,
          link: o.link || "https://sagradodemim.com.br", link_text: o.textoLink || "Abrir no site" }
      })
    });
    return res.ok;
  } catch (e) { return false; }
}
