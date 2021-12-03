<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:roi="http://tempuri.org/ROI" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
		<ul class="department-list">
			<xsl:for-each select="//roi:Department" xml:space="preserve">

					<p><b>Department #
					<xsl:value-of select="@Id"/>. </b>
					<xsl:value-of select ="roi:Name"/>
						</p>
			</xsl:for-each>
		</ul>
    </xsl:template>
</xsl:stylesheet>
