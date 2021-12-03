<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ViewPeople.aspx.cs" Inherits="RoiBackend.data.ViewPeople" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>ROI: View All People</title>
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
                <h1>View All People</h1>
            </header>
            <div class="output-area">
                <asp:Xml ID="Xml1" runat="server" DocumentSource="~/data/People.xml" TransformSource="~/data/ViewPeople.xslt"></asp:Xml>
            </div>
            <footer class="site-footer">
                <p class="copyright"><small>&copy;ROI <asp:Label ID="lblCopyrightYear" runat="server"></asp:Label></small></p>
            </footer>
        </div>
    </form>
</body>
</html>
