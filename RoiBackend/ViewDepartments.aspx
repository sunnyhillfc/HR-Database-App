<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ViewDepartments.aspx.cs" Inherits="RoiBackend.ViewDepartments" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="charset" content="utf-8" />
    <title>ROI: View Departments</title>
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
                <h1>View All Departments</h1>
            </header>
            <div class="output-area">
                <asp:Xml ID="Xml1" runat="server" DocumentSource="~/data/Departments.xml" TransformSource="~/data/ViewDepartments.xslt"></asp:Xml>
            </div>
            <footer class="site-footer">
                <p class="copyright"><small>&copy;ROI <asp:Label ID="lblCopyrightYear" runat="server"></asp:Label></small></p>
            </footer>
        </div>
    </form>
</body>
</html>
