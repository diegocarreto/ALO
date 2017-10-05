namespace BL
{
    using BL.Utils;
    using DAL;
    using DTO;
    using OfficeOpenXml;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net.Mail;

    public class CotBl
    {
        public string Message { get; set; }

        public bool IsCorrect { get; set; }

        public string Login(string usuario, string contrasenia)
        {
            this.IsCorrect = false;

            var token = "Usuario o contraseña incorrecta";

            try
            {
                var result = new CotDal().Login(usuario, contrasenia);

                if (string.IsNullOrEmpty(result))
                {
                    var apiToken = new ApiToken();

                    token = apiToken.CreateApiToken(result);

                    IsCorrect = true;
                }
            }
            catch (Exception ex)
            {
                token = ex.Message;
            }

            return token;
        }

        public List<Product> GetProducts(string Token)
        {
            var list = new List<Product>();

            this.IsCorrect = false;
            this.Message = "Productos obtenidos exitosamente";

            try
            {
                var token = this.GetToken(Token);

                this.Message = token.Message;
                this.IsCorrect = token.IsCorrect;

                if (this.IsCorrect)
                {
                    list = new CotDal().GetProducts(token);
                    this.IsCorrect = true;
                }
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
            }

            return list;
        }

        private Token GetToken(string ApiToken)
        {
            var token = new Token
            {
                Message = "Ejecución correcta",
                IsCorrect = true
            };

            if (!string.IsNullOrEmpty(ApiToken))
            {
                var apiToken = new ApiToken();

                var values = apiToken.CheckApiToken(ApiToken);

                if (apiToken.IsCorrect)
                {
                    var elements = values.Split('|');

                    if (elements.Length.Equals(3))
                    {
                        token.IdUser = int.Parse(elements[0].ToString());
                    }
                    else
                    {
                        token.Message = "Token incorrecto [TKN101]";
                        token.IsCorrect = false;
                    }
                }
                else
                {
                    token.Message = apiToken.ErrorMessage;
                    token.IsCorrect = false;
                }
            }
            else
            {
                token.Message = "Token incorrecto [TKN100]";
                token.IsCorrect = false;
            }

            return token;
        }

        public void SendQ(string Token, int Id)
        {
            var cot = new CotDal();

            this.IsCorrect = false;
            this.Message = string.Empty;

            try
            {
                var token = this.GetToken(Token);

                this.Message = token.Message;
                this.IsCorrect = token.IsCorrect;

                if (this.IsCorrect)
                {
                    var head = cot.GetHeaderQ(Id);
                    var body = cot.GetBodyQ(Id);
                    var mails = cot.GetPlantMail(head.IdPlant);
                    var excelFile = this.GetExcel(Id, head, body);

                    this.SendMail(head, mails, excelFile);

                    this.Message = "Su cotización fue enviada a sus correo electrónico";
                    this.IsCorrect = true;
                }
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
            }
        }

        private MemoryStream GetExcel(int Id, HeaderQ Header, List<Product> Body)
        {
            var path = System.Web.HttpContext.Current.Server.MapPath("~/Content/template/" + this.AppSet("Excel-Template"));
            var fileinfo = new FileInfo(path);

            var newFile = new FileInfo(System.Web.HttpContext.Current.Server.MapPath("~/Content/template/otro.xlsx"));

            ExcelPackage package = new ExcelPackage(fileinfo, true);

            ExcelWorksheet ws = package.Workbook.Worksheets[1];

            ws.Cells[2, 1].Value = "Cotización: " + Id.ToString().PadLeft(10, '0');

            ws.Cells[2, 3].Style.WrapText = true;
            ws.Cells[2, 3].Value = Header.AddressPlant + Environment.NewLine +
                                   "Teléfono: " + Header.PhonePlant +
                                   (string.IsNullOrEmpty(Header.CellPhonePlant) ? string.Empty : "     Celular: " + Header.CellPhonePlant);

            ws.Cells[3, 1].Value = Header.Name;

            for (int i = 0; i < Body.Count; i++)
            {
                var record = Body[i];
                var row = i + 5;

                ws.Cells[row, 1].Value = record.IdProduct;
                ws.Cells[row, 2].Value = record.Name;
                ws.Cells[row, 3].Value = record.Kg;
                ws.Cells[row, 4].Value = record.Min;
                ws.Cells[row, 5].Value = record.Price;
                ws.Cells[row, 6].Value = record.Quantity;
                ws.Cells[row, 7].Value = record.TotalKg;
                ws.Cells[row, 8].Value = record.Total;
            }

            package.Save();

            return new MemoryStream(package.GetAsByteArray());
        }

        private void SendMail(HeaderQ Header, List<PlantMail> Mails, MemoryStream ExcelFile)
        {
            var to = Header.Email;

            var from = this.AppSet("Mail-From");
            var subject = this.AppSet("Mail-Subject");

            var bcc = this.GetMails(Mails, "BCC");
            var cc = this.GetMails(Mails, "CC");

            var path = System.Web.HttpContext.Current.Server.MapPath("~/Content/template/" + this.AppSet("Mail-Template"));
            var html = System.IO.File.ReadAllText(path, System.Text.Encoding.UTF8);

            var port = this.AppSet<int>("Mail-Port");
            var host = this.AppSet("Mail-Host");
            var user = this.AppSet("Mail-Credentials-User");
            var password = this.AppSet("Mail-Credentials-Password");

            var mail = new MaltaMail(to, from, subject, html, user, password, host, port)
            {
                CC = cc,
                BCC = bcc,
                Attachment = ExcelFile,
                AttachmentName = "Cotización.xlsx",
                AttachmentMediaType = "application/vnd.ms-excel"
            };

            mail.Send();
        }

        private string GetMails(List<PlantMail> Mails, string Type)
        {
            var mails = string.Empty;

            foreach (var mail in Mails)
            {
                if (mail.Type.Equals(Type, StringComparison.InvariantCultureIgnoreCase))
                    mails += mail.Email + ",";
            }

            mails = mails.TrimEnd(',');

            return mails;
        }
    }
}