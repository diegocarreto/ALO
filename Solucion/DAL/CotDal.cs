namespace DAL
{
    using DTO;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;

    public class CotDal
    {
        private string ConnectionStrings = ConfigurationManager.ConnectionStrings["ado"].ToString();

        public string Login(string usuario, string contrasenia)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
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
                                return dt.Rows[0]["usuario"].ToString() + "|" +
                                       dt.Rows[0]["IdDIstribuidor"].ToString() + "|" +
                                       dt.Rows[0]["IdPlanta"].ToString();
                            }
                            else
                                return string.Empty;
                        }
                    }
                }
            }
        }

        public List<Product> GetProducts(Token Token)
        {
            var list = new List<Product>();

            using (var con = new SqlConnection(this.ConnectionStrings))
            {
                using (var cmd = new SqlCommand("ListaProductos", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@idUsuario", SqlDbType.Int);
                    cmd.Parameters["@idUsuario"].Value = Token.IdUser;

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

            return list;
        }

        public HeaderQ GetHeaderQ(int Id)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("DatosCotizacion", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@idCotizacion", SqlDbType.VarChar, 100);
                    cmd.Parameters["@idCotizacion"].Value = Id;

                    con.Open();

                    using (var ada = new SqlDataAdapter(cmd))
                    {
                        using (var dt = new DataTable())
                        {
                            ada.Fill(dt);

                            if (dt.Rows.Count > 0)
                            {
                                return new HeaderQ
                                {
                                    Name = dt.Rows[0]["Nombre"].ToString(),
                                    Phone = dt.Rows[0]["Telefono"].ToString(),
                                    CellPhone = dt.Rows[0]["Celular"].ToString(),
                                    Email = dt.Rows[0]["Mail"].ToString(),
                                    Day = dt.Rows[0]["dia"].ToString(),

                                    IdPlant = int.Parse(dt.Rows[0]["IdPlanta"].ToString()),
                                    Plant = dt.Rows[0]["Planta"].ToString(),
                                    AddressPlant = dt.Rows[0]["PlantaDireccion"].ToString(),
                                    PhonePlant = dt.Rows[0]["PlantaTelefono"].ToString(),
                                    CellPhonePlant = (dt.Rows[0]["PlantaDireccion"] == null ? string.Empty : dt.Rows[0]["PlantaCelular"].ToString())

                                };
                            }
                            else
                                return null;
                        }
                    }
                }
            }
        }

        public List<Product> GetBodyQ(int Id)
        {
            var list = new List<Product>();

            using (var con = new SqlConnection(this.ConnectionStrings))
            {
                using (var cmd = new SqlCommand("ListaProductosCotizacion", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);
                    cmd.Parameters["@idCotizacion"].Value = Id;

                    con.Open();

                    using (var r = cmd.ExecuteReader())
                    {
                        while (r.Read())
                        {
                            list.Add(new Product
                            {
                                IdProduct = int.Parse(r["IdProducto"].ToString()),
                                Name = r["Nombre"].ToString(),
                                Kg = float.Parse(r["Kilos"].ToString()),
                                Price = float.Parse(r["Precio"].ToString()),
                                Min = float.Parse(r["Minimo"].ToString()),
                                Quantity = float.Parse(r["Cantidad"].ToString()),
                                TotalKg = float.Parse(r["kgTotal"].ToString()),
                                Total = float.Parse(r["Total"].ToString()),
                            });
                        }
                    }
                }
            }

            return list;
        }

        public List<PlantMail> GetPlantMail(int Id)
        {
            var list = new List<PlantMail>();

            using (var con = new SqlConnection(this.ConnectionStrings))
            {
                using (var cmd = new SqlCommand("CorreosPlanta", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@IdPlanta", SqlDbType.Int);
                    cmd.Parameters["@IdPlanta"].Value = Id;

                    con.Open();

                    using (var r = cmd.ExecuteReader())
                    {
                        while (r.Read())
                        {
                            list.Add(new PlantMail
                            {
                                MarketStall = r["Nombre"].ToString(),
                                Name = r["Nombre"].ToString(),
                                Email = r["Correo"].ToString(),
                                Type = r["Tipo"].ToString(),
                            });
                        }
                    }
                }
            }

            return list;
        }
    }
}