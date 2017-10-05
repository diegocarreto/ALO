namespace malta.Controllers
{
    using System.Web.Mvc;
    using BL;

    public class CotController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Login(string usuario, string contrasenia)
        {
            var cot = new CotBl();
            var token = cot.Login(usuario, contrasenia);

            return Json(new
            {
                correcto = cot.IsCorrect,
                token
            },
            JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetProducts(string Token)
        {
            var cot = new CotBl();
            var products = cot.GetProducts(Token);

            return Json(new
            {
                list = products,
                isCorrect = cot.IsCorrect,
                message = cot.Message
            },
            JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SendQ(string Token, int Id)
        {
            var cot = new CotBl();

            cot.SendQ(Token, Id);

            return Json(new
            {
                isCorrect = cot.IsCorrect,
                message = cot.Message
            },
            JsonRequestBehavior.AllowGet);
        }
    }
}