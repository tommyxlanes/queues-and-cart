type OrderItem = {
  title: string;
  quantity: number;
  unitPrice: number; // cents
};

export function orderConfirmationTemplate(params: {
  orderId: string;
  items: OrderItem[];
  total: number; // cents
}) {
  const { orderId, items, total } = params;

  return `
    <div style="font-family: system-ui, sans-serif; line-height: 1.5">
      <h2>Thanks for your order 🎉</h2>

      <p>Your order <strong>${orderId}</strong> has been confirmed.</p>

      <table width="100%" cellpadding="8" cellspacing="0">
        ${items
          .map(
            (i) => `
              <tr>
                <td>${i.title} × ${i.quantity}</td>
                <td align="right">$${((i.unitPrice * i.quantity) / 100).toFixed(
                  2,
                )}</td>
              </tr>
            `,
          )
          .join("")}
      </table>

      <hr />

      <p><strong>Total:</strong> $${(total / 100).toFixed(2)}</p>

      <p style="color: #666">
        You’ll receive another email once your order ships.
      </p>
    </div>
  `;
}
