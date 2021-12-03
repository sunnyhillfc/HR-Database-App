using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RoiBackend
{
    public partial class ViewDepartments : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            lblCopyrightYear.Text = DateTime.Now.Year.ToString();
        }
    }
}