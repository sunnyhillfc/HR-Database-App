<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:roi="http://tempuri.org/ROI"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
		<table class="person-table">
			<thread>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Phone</th>
					<th>Department</th>
					<th>Address</th>
				</tr>
			</thread>
			<tbody>
				<xsl:for-each select="//roi:Person" xml:space="preserve">
					<xsl:variable name="departmentId" select="roi:DepartmentId"></xsl:variable>
					<tr>
						<td><xsl:value-of select="@Id"/></td>
						<td><xsl:value-of select ="roi:Name"/></td>
						<td><xsl:value-of select ="roi:Phone"/></td>
						<td><xsl:value-of select ="document('Departments.xml')/ roi:Departments/roi:Department[@Id=$departmentId]/roi:Name"/></td>
						<td>
							<xsl:value-of select ="roi:Address/roi:Street"/>
							<xsl:value-of select ="roi:Address/roi:City"/>
							<xsl:value-of select ="roi:Address/roi:State"/>
							<xsl:value-of select ="roi:Address/roi:Zip"/>
							<xsl:value-of select ="roi:Address/roi:Country"/>
						</td>
					
					</tr>
					
			</xsl:for-each>
				
			
			</tbody>
		</table>
    </xsl:template>
</xsl:stylesheet>
