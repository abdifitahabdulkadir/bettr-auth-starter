interface Props {
  linkTo: string;
  description: string;
  buttonText: string;
}
export function emailTempelate({ linkTo, buttonText, description }: Props) {
  return ` <!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <h3
                style="font-weight:bold;text-align:center;margin:0;font-size:20px;padding:32px 24px 0px 24px"
              >
                Welcome to Better Auth
              </h3>
              <div
                style="color:#474849;font-size:20px;font-weight:normal;text-align:left;padding:8px 24px 16px 24px"
              >
               "${description}"
      
              </div>
              <div style="text-align:center;padding:12px 24px 32px 24px">
                <a
                  href="${linkTo}"
                  style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#171717;border-radius:64px;display:inline-block;padding:16px 32px;text-decoration:none"
                  target="_blank"
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 32px;mso-font-width:-100%;mso-text-raise:48"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ><span>"${buttonText}"</span
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 32px;mso-font-width:-100%"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ></a
                >
              </div>
              <div style="padding:16px 24px 16px 24px">
                <hr
                  style="width:100%;border:none;border-top:1px solid #EEEEEE;margin:0"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;
}
