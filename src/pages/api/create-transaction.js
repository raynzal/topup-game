import midtransClient from 'midtrans-client'

let snap = null

function getSnap() {
  if (snap) return snap
  if (!process.env.MIDTRANS_SERVER_KEY || !process.env.MIDTRANS_CLIENT_KEY) {
    return null
  }
  snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  })
  return snap
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { product, gameId, serverId, nickname, email, game: gameName } = req.body

  if (!product || !gameId || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const orderId = `ZALL-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  const snapInstance = getSnap()

  if (!snapInstance) {
    return res.status(200).json({
      snapToken: null,
      orderId,
      total: product.price,
      mode: 'demo',
      message: 'Midtrans not configured. Set MIDTRANS_SERVER_KEY and MIDTRANS_CLIENT_KEY in .env.local',
    })
  }

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: product.price,
    },
    item_details: [
      {
        id: product.id,
        price: product.price,
        quantity: 1,
        name: `${gameName} - ${product.name}`,
        category: 'Top Up',
      },
    ],
    customer_details: {
      first_name: nickname || 'Gamer',
      email: email,
      phone: '',
    },
    custom_field1: gameId,
    custom_field2: serverId || '',
    credit_card: {
      secure: true,
    },
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://topup-game-lyart.vercel.app'}/history`,
    },
  }

  try {
    const transaction = await snapInstance.createTransaction(parameter)
    res.status(200).json({
      snapToken: transaction.token,
      orderId,
      total: product.price,
      mode: 'live',
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction', details: error.message })
  }
}
