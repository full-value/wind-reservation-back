const { Alert, AlertReadStatus } = require('../models/Alert');

// Get all alerts with read status for a specific user
const getAlerts = async (req, res) => {
  try {
    const userId = req.user?.id; // Assuming user info is available in req.user
    console.log("userId",userId);
    const alerts = await Alert.findAll({
      include: [{
        model: AlertReadStatus,
        where: { user_id: userId },
        required: false
      }]
    });   
    // Transform the response to include read status
    const transformedAlerts = alerts.map(alert => ({
      ...alert.toJSON(),
      readStatus: alert.AlertReadStatus?.[0]?.read_status ? 'read' : 'unread'
    }));

    res.json(transformedAlerts);
  } catch (err) {
    res.status(500).json({ message: 'アラートの取得に失敗しました', error: err.message });
  }
};
// Get all alerts
const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.findAll();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'アラートの取得に失敗しました', error: err.message });
  }
};


// Create new alert
const createAlert = async (req, res) => {
  try {    
    const alert = await Alert.create(req.body);    
    res.status(201).json(alert);    
  } catch (err) {
    res.status(400).json({ message: 'アラートの作成に失敗しました', error: err.message });
  }
};

// Update alert by ID
const updateAlert = async (req, res) => {
  try {
    const { id } = req.params;  
    const [updated] = await Alert.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedAlert = await Alert.findByPk(id);
      res.json(updatedAlert);
    } else {
      res.status(404).json({ message: 'アラートが見つかりません' });
    }
  } catch (err) {
    res.status(400).json({ message: 'アラートの更新に失敗しました', error: err.message });
  }
};

// Mark alert as read for a specific user
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id; // Assuming user info is available in req.user

    // Find or create read status record
    const [readStatus, created] = await AlertReadStatus.findOrCreate({
      where: {
        alert_id: id,
        user_id: userId
      },
      defaults: {
        read_status: true
      }
    });

    if (!created) {
      await readStatus.update({ read_status: true });
    }

    const updatedAlert = await Alert.findByPk(id, {
      include: [{
        model: AlertReadStatus,
        where: { user_id: userId },
        required: false
      }]
    });

    res.json({
      ...updatedAlert.toJSON(),
      readStatus: 'read'
    });
  } catch (err) {
    res.status(400).json({ message: 'アラートを既読にできませんでした', error: err.message });
  }
};

// Delete alert by ID
const deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;     
    const deleted = await Alert.destroy({
      where: { id: id }
    });

    if (deleted) {
      res.json({ message: 'アラートを削除しました' });
    } else {
      res.status(404).json({ message: 'アラートが見つかりません' });
    }
  } catch (err) {
    res.status(500).json({ message: 'アラートの削除に失敗しました', error: err.message });
  }
};


module.exports = {
  getAlerts,
  getAllAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
  markAsRead
};
