namespace enviarmail
{
    using System.IO;
    using System.Net.Mail;
    using System.Text;

    class Program
    {
        static void Main(string[] args)
        {
           //Creamos un nuevo Objeto de mensaje
            System.Net.Mail.MailMessage mmsg = new System.Net.Mail.MailMessage();

            //Direccion de correo electronico a la que queremos enviar el mensaje
            mmsg.To.Add("eg@aloalo.mx,la@aloalo.mx,eo@aloalo.mx");

            //Nota: La propiedad To es una colección que permite enviar el mensaje a más de un destinatario

            //Asunto
            mmsg.Subject = "Tu cotización está en proceso";
            mmsg.SubjectEncoding = System.Text.Encoding.UTF8;

            //Direccion de correo electronico que queremos que reciba una copia del mensaje
            mmsg.Bcc.Add("diego.ao.carreto@gmail.com"); //Opcional

            mmsg.b

            string path = Directory.GetCurrentDirectory() + "\\email.html";

            //Cuerpo del Mensaje
            mmsg.Body = File.ReadAllText(path, Encoding.UTF8);
            mmsg.BodyEncoding = System.Text.Encoding.UTF8;
            mmsg.IsBodyHtml = true; //Si no queremos que se envíe como HTML


            //Correo electronico desde la que enviamos el mensaje
            mmsg.From = new System.Net.Mail.MailAddress("maltacleyton@alopruebas.com.mx");

            mmsg.Attachments.Add(new Attachment(Directory.GetCurrentDirectory() + "\\Cotizaciones.xlsx"));

            /*-------------------------CLIENTE DE CORREO----------------------*/

            //Creamos un objeto de cliente de correo
            System.Net.Mail.SmtpClient cliente = new System.Net.Mail.SmtpClient();

            //Hay que crear las credenciales del correo emisor
            //cliente.Credentials = new System.Net.NetworkCredential("cotizaciones@alopruebas.com.mx", "Cbcl04?1");

            cliente.Credentials = new System.Net.NetworkCredential("maltacleyton@alopruebas.com.mx", "Cbcl04?1");
            

            //Lo siguiente es obligatorio si enviamos el mensaje desde Gmail

            cliente.Port = 587;
            //cliente.EnableSsl = true;
            

            cliente.Host = "mail.alopruebas.com.mx"; //Para Gmail "smtp.gmail.com";


            /*-------------------------ENVIO DE CORREO----------------------*/

            try
            {
                //Enviamos el mensaje      
                cliente.Send(mmsg);
            }
            catch (System.Net.Mail.SmtpException ex)
            {
                //Aquí gestionamos los errores al intentar enviar el correo
            }
        }
    }
}
