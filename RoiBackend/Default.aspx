<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="RoiBackend.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>ROI: Home</title>
    <link rel="icon" type="image/x-icon" href="images/favicon.png" />
    <link rel="stylesheet" href="css/main.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="site-wrapper">
            <header class="site-header">
                <div class="header-logo">
                    <image src="images/roi-logo.jpg" alt="ROI LOGO"></image>
                </div>
                <h1>HR Management System</h1>
            </header>
            <nav class="main-nav">
                <ul>
                    <li>
                        <asp:HyperLink NavigateUrl="~/ViewDepartments.aspx" runat="server">View Departments</asp:HyperLink>

                    </li>
                     <li>
                        <asp:HyperLink NavigateUrl="~/ViewPeople.aspx" runat="server">View People</asp:HyperLink>

                    </li>
                </ul>
            </nav>
            <footer class="site-footer">
                <p class="copyright"><small>&copy;ROI <asp:Label ID="lblCopyrightYear" runat="server"></asp:Label></small></p>
            </footer>
        </div>
    </form>
</body>
</html>