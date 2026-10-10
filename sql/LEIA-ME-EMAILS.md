# Configurar os e-mails dos kits (EmailJS, grátis até 200 e-mails/mês)

1. Crie uma conta em https://www.emailjs.com (pode entrar com o Google).
2. **Email Services > Add New Service > Gmail** e conecte o e-mail sagradodemimm@gmail.com. Anote o **Service ID**.
3. **Email Templates > Create New Template**, preencha assim e salve. Anote o **Template ID**.
   - Subject: `{{subject}}`
   - To Email: `{{to_email}}`
   - From Name: `Sagrado de Mim`
   - Reply To: `sagradodemimm@gmail.com`
   - Content:
     ```
     {{message}}

     {{link_text}}: {{link}}
     ```
4. **Account > General > Public Key**: copie a chave.
5. Em **Account > Security**, deixe marcado só o domínio `sagradodemim.com.br` (evita que outros sites usem sua conta).
6. Coloque os três valores no arquivo `emails.js` (publicKey, serviceId, templateId).
