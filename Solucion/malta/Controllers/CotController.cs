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

namespace malta.Controllers
{

    // Controlador de las vistas para blog de noticias y articulos
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
                                    token = dt.Rows[0]["mail"].ToString() + "|" + dt.Rows[0]["estado"].ToString() + "|" + dt.Rows[0]["C_P"].ToString();
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

            return Json(new { correcto, token }, JsonRequestBehavior.AllowGet);;
        }
    }
}