type OrderItem = {
  title: string;
  quantity: number;
  unitPrice: number; // cents
  imageUrl: string | null;
};

export function orderConfirmationTemplate(params: {
  orderId: string;
  items: OrderItem[];
  total: number; // cents
}) {
  const { orderId, items, total } = params;

  return `
    <div style="font-family: system-ui, sans-serif; line-height: 1.5; max-width: 600px; margin: 0 auto;">
      <h2>Thanks for your order 🎉</h2>

      <p>Your order <strong>${orderId}</strong> has been confirmed.</p>

      <table width="100%" cellpadding="12" cellspacing="0" style="border-collapse: collapse;">
        ${items
          .map(
            (i) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="width: 80px;">
                  ${
                    i.imageUrl
                      ? `<img src="${i.imageUrl}" alt="${i.title}" width="64" height="64" style="border-radius: 8px; object-fit: cover;" />`
                      : `<div style="width: 64px; height: 64px; background: #f0f0f0; border-radius: 8px;"></div>`
                  }
                </td>
                <td style="vertical-align: middle;">
                  <strong>${i.title}</strong><br />
                  <span style="color: #666;">Qty: ${i.quantity}</span>
                </td>
                <td align="right" style="vertical-align: middle;">
                  $${((i.unitPrice * i.quantity) / 100).toFixed(2)}
                </td>
              </tr>
            `,
          )
          .join("")}
      </table>

      <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #000;">
        <table width="100%">
          <tr>
            <td><strong>Total</strong></td>
            <td align="right"><strong>$${(total / 100).toFixed(2)}</strong></td>
          </tr>
        </table>
      </div>

      <p style="color: #666; margin-top: 24px;">
        You'll receive another email once your order ships.
      </p>
    </div>
  `;
}
