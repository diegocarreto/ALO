namespace malta.Models.Quotation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class Product
    {
        public int IdPlant { get; set; }

        public int IdProduct { get; set; }

        public string Image { get; set; }

        public string Name { get; set; }

        public string Measure { get; set; }

        public float Price { get; set; }

        public float Min { get; set; }

        public float Discount { get; set; }

        public float Kg { get; set; }
    }
}