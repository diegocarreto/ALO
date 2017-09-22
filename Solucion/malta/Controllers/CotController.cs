namespace malta.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Web;
    using System.Web.Mvc;
    using malta.Models;
    using System.Data.SqlClient;
    using System.Configuration;
    using malta.Models.Quotation;

    public class CotController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Login(string usuario, string contrasenia)
        {
            var token = "Usuario o contraseña incorrecta";
            var correcto = false;

            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ado"].ToString()))
                {
                    using (SqlCommand cmd = new SqlCommand("login", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar, 100);
                        cmd.Parameters["@usuario"].Value = usuario;

                        cmd.Parameters.Add("@contrasenia", SqlDbType.VarChar, 100);
                        cmd.Parameters["@contrasenia"].Value = contrasenia;

                        con.Open();

                        using (var ada = new SqlDataAdapter(cmd))
                        {
                            using (var dt = new DataTable())
                            {
                                ada.Fill(dt);

                                if (dt.Rows.Count > 0)
                                {
                                    var apiToken = new ApiToken();

                                    var result = dt.Rows[0]["usuario"].ToString() + "|" +
                                                 dt.Rows[0]["IdDIstribuidor"].ToString() + "|" +
                                                 dt.Rows[0]["IdPlanta"].ToString();

                                    token = apiToken.CreateApiToken(result);

                                    correcto = true;
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                token = ex.Message;
                correcto = false;
            }

            return Json(new { correcto, token }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetProducts(string Token)
        {
            var list = new List<Product>();
            var message = "OK";
            var isCorrect = true;

            try
            {
                var value = this.GetToken(Token);
                message = value.Message;
                isCorrect = value.IsCorrect;

                if (isCorrect)
                {
                    using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ado"].ToString()))
                    {
                        using (var cmd = new SqlCommand("ListaProductos", con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;

                            cmd.Parameters.Add("@idUsuario", SqlDbType.Int);
                            cmd.Parameters["@idUsuario"].Value = value.IdUser;

                            con.Open();

                            using (var r = cmd.ExecuteReader())
                            {
                                while (r.Read())
                                {
                                    list.Add(new Product
                                    {
                                        IdPlant = int.Parse(r["IdPlanta"].ToString()),
                                        IdProduct = int.Parse(r["IdProducto"].ToString()),
                                        Image = r["Imagen"].ToString(),
                                        Name = r["Nombre"].ToString(),
                                        Measure = r["Medida"].ToString(),
                                        Price = float.Parse(r["Precio"].ToString()),
                                        Min = float.Parse(r["Minimo"].ToString()),
                                        Kg = float.Parse(r["Kilos"].ToString()),
                                        Discount = float.Parse(r["Descuento"].ToString())

                                    });
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

            return Json(new
            {
                list,
                isCorrect,
                message
            }, JsonRequestBehavior.AllowGet); ;
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
    }
}