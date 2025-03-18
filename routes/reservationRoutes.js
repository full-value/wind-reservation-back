const express = require('express');
const { 
        findFlat, findWork, findReservation, findChangeDate, 
        updatReservation, getChangeableDate, createReservation,
        getReservations,getReservationListData,deleteReservation
        ,getDashboardData,getAvailableDate
     } = require('../controllers/reservationController');

const router = express.Router();

// search Flat name

router.post('/getAvailableDate',getAvailableDate);

router.post('/findFlat',findFlat);
router.post('/findWork',findWork);
router.post('/findReservation',findReservation);
router.post('/findChangeDate',findChangeDate);
router.post('/updateReservation',updatReservation);
router.post('/getChangeableDate',getChangeableDate);
router.post('/createReservation',createReservation);
router.post('/getReservations',getReservations);
router.post('/getReservationListData',getReservationListData);
router.post('/deleteReservation',deleteReservation);
router.get('/getDashboardData',getDashboardData);


module.exports = router;
