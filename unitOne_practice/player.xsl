<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    <xsl:strip-space elements="*"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Player Information</title>
                <link rel="stylesheet" type="text/css" href="style.css"/>
            </head>
            <body>
                <h1>Player Information</h1>
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>Team</th>
                    </tr>
                    <xsl:for-each select="/players/player">
                        <tr>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="age"/></td>
                            <td><xsl:value-of select="position"/></td>
                            <td><xsl:value-of select="team"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>