namespace malta.Models.Quotation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class Token
    {
        public int IdUser { get; set; }

        public string Message { get; set; }

        public bool IsCorrect { get; set; }
    }
}