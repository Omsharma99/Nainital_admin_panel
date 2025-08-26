export const createTables = async (pool) => {
    const query1 = `
        CREATE TABLE IF NOT EXISTS users_table (
        userId VARCHAR(100) PRIMARY KEY,
        email VARCHAR(255),
        phoneNo VARCHAR(20) UNIQUE NOT NULL,
        firstname VARCHAR(50) ,
        lastname VARCHAR(50) ,
        gender VARCHAR(20) ,
        dob Date,
        profileImg TEXT,
        address VARCHAR(255),
        accessToken VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `;
    const query2 = `
        CREATE TABLE IF NOT EXISTS merchants_table (
        merchantId VARCHAR(100) PRIMARY KEY,
        fullName VARCHAR(100) NOT NULL,
        phoneNo VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(255),
        category VARCHAR(50) NOT NULL CHECK (category IN ('Grocery', 'Pharma', 'Restaurant', 'Other')),
        businessName VARCHAR(100) NOT NULL,
        businessAddress VARCHAR(255) NOT NULL,
        pinCode VARCHAR(10) NOT NULL,
        city VARCHAR(50) NOT NULL,
        GSTINumber VARCHAR(15) UNIQUE,
        businessType VARCHAR(50) NOT NULL CHECK (businessType IN ('Sole Proprietor', 'Private Ltd', 'LLP', 'Other')),
        openingHours VARCHAR(20) NOT NULL,
        closingHours VARCHAR(20) NOT NULL,
        deliveryAvailable VARCHAR(10) NOT NULL CHECK (deliveryAvailable IN ('Yes', 'No')),
        panCardNumber VARCHAR(10) UNIQUE,
        shopImage TEXT,
        addressProof TEXT,
        bankName VARCHAR(100),
        accountHolderName VARCHAR(100),
        accountNumber VARCHAR(20),
        IFSCCode VARCHAR(11),
        aadharNumber VARCHAR(12) UNIQUE,
        accessToken VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
    const query3 = `
    CREATE TABLE IF NOT EXISTS schedules (
    scheduleId UUID PRIMARY KEY,
    userId VARCHAR(100) REFERENCES users_table(userId) ON DELETE CASCADE,
    leavingFrom VARCHAR(255) NOT NULL,
    goingTo VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(20) NOT NULL,
    distanceKm FLOAT NOT NULL,
    transportType VARCHAR(20) NOT NULL CHECK (transportType IN ('Bike', 'Cab', 'Auto', 'SUV')),
    passengerCount INT NOT NULL DEFAULT 1,
    isReturn BOOLEAN DEFAULT FALSE,
    returnDate DATE,
    returnTime VARCHAR(20),
    estimatedPrice FLOAT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

    const query4 = `
    CREATE TABLE IF NOT EXISTS delivery (
    deliveryId UUID PRIMARY KEY,
    userId VARCHAR(100) REFERENCES users_table(userId) on DELETE CASCADE,
    pickupLocation VARCHAR(255) NOT NULL,
    dropOffLocation VARCHAR(255) NOT NULL,
    parcelType VARCHAR(50) NOT NULL CHECK (parcelType IN ('Document', 'Electronics', 'Clothes', 'Food', 'House Shifting', 'Other')),
    vehicleType VARCHAR(30) NOT NULL CHECK (vehicleType IN ('Bike', 'Scooter', 'Auto', 'Mini Truck', 'Pickup', 'Tata 407', 'Large Truck')),
    packageDescription TEXT NOT NULL,
    specialInstructions TEXT,
    receiverName VARCHAR(100) NOT NULL,
    receiverPhone VARCHAR(20) NOT NULL,
    paymentOption VARCHAR(20) NOT NULL CHECK (paymentOption IN ('Cash', 'UPI', 'Card', 'Wallet')),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
    const query5 = `
    CREATE TABLE IF NOT EXISTS routes (
    routeId UUID PRIMARY KEY,
    name TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

    const query6 = `
    CREATE TABLE IF NOT EXISTS stops (
    stopId UUID PRIMARY KEY,
    name TEXT NOT NULL,
    sequence INT NOT NULL,
    routeId UUID REFERENCES routes(routeId) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
    const query7 = `
    CREATE TABLE IF NOT EXISTS trips (
    tripId UUID PRIMARY KEY,
    routeId UUID REFERENCES routes(routeId) ON DELETE CASCADE,
    departureTime TIME NOT NULL,
    arrivalTime TIME NOT NULL,
    fare FLOAT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

    const query8 = `
    CREATE TABLE IF NOT EXISTS seats (
    seatId UUID PRIMARY KEY,
    tripId UUID REFERENCES trips(tripId) ON DELETE CASCADE,
    seatNumber INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

    const query9 = `
    CREATE TABLE IF NOT EXISTS bookings (
    bookingId UUID PRIMARY KEY,
    userId VARCHAR(100) REFERENCES users_table(userId) ON DELETE CASCADE,
    tripId UUID REFERENCES trips(tripId) ON DELETE CASCADE,
    seatId UUID REFERENCES seats(seatId) ON DELETE CASCADE,
    from_stop_id UUID REFERENCES stops(stopId) ON DELETE CASCADE,
    to_stop_id UUID REFERENCES stops(stopId) ON DELETE CASCADE,
    bookingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paymentStatus VARCHAR(20) NOT NULL CHECK (paymentStatus IN ('Success', 'Pending', 'Failed'))
);
`

    const query10 = `
    CREATE TABLE IF NOT EXISTS emergency_contacts (
    contactId UUID PRIMARY KEY,
    userId VARCHAR(100) REFERENCES users_table(userId) ON DELETE CASCADE,
    contactName VARCHAR(100) NOT NULL,
    contactPhone VARCHAR(20) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`
    const query11 = `
    CREATE TABLE IF NOT EXISTS sos_events (
    sosId UUID PRIMARY KEY,
    userId VARCHAR(100) REFERENCES users_table(userId) ON DELETE CASCADE,
    driverLocation TEXT, 
    userLocation TEXT NOT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
    const query12 = `
    CREATE TABLE IF NOT EXISTS shared_locations (
    shareId UUID PRIMARY KEY,
    userId VARCHAR(100) REFERENCES users_table(userId) ON DELETE CASCADE,
    userLocation TEXT NOT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

    const query13 = `
    CREATE TABLE IF NOT EXISTS chat_messages (
    messageId UUID PRIMARY KEY,
    senderId VARCHAR(100) REFERENCES users_table(userId) ON DELETE CASCADE,
    receiverId VARCHAR(100) REFERENCES users_table(userId) ON DELETE CASCADE,
    message TEXT NOT NULL,
    sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

const query14 = `
    CREATE TABLE IF NOT EXISTS merchant_delivery (
    deliveryId UUID PRIMARY KEY,
    merchantId VARCHAR(100) REFERENCES merchants_table(merchantId) ON DELETE CASCADE,
    pickupLocation VARCHAR(255) NOT NULL,
    receiverName VARCHAR(100) NOT NULL,
    receiverPhone VARCHAR(20) NOT NULL,
    deliveryAddress VARCHAR(255) NOT NULL,
    parcelType VARCHAR(50) NOT NULL CHECK (parcelType IN ('Food', 'Document', 'Small Box', 'Large Box', 'Other')),
    vehicleType VARCHAR(30) NOT NULL CHECK (vehicleType IN ('Bike', 'Car', 'Pickup')),
    specialInstructions TEXT,
    estimatedPrice FLOAT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`


const query15 = `
    CREATE TABLE IF NOT EXISTS drivers_data (
    userId VARCHAR(100) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    phoneNo VARCHAR(20),
    serviceType VARCHAR(50),
    vehicleType VARCHAR(50),
    profileImg TEXT,
	refreshToken VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

const query16 = `
    CREATE TABLE IF NOT EXISTS shuttle_bookings (
    id INT PRIMARY KEY,
    vehicle_type VARCHAR(50),
    route VARCHAR(255),
    timing VARCHAR(50),
    seats INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`


    const values = [userId, email, hashedPassword];
    
    try {
        await pool.query(query1);
        console.log("query 1 done")

        await pool.query(query2);
        console.log("query 2 done")

        await pool.query(query3);
        console.log("query 3 done")

        await pool.query(query4);
        console.log("query 4 done")

        await pool.query(query5);
        console.log("query 5 done")

        await pool.query(query6);
        console.log("query 6 done")

        await pool.query(query7);
        console.log("query 7 done")

        await pool.query(query8);
        console.log("query 8 done")

        await pool.query(query9);
        console.log("query 9 done")

        await pool.query(query10);
        console.log("query 10 done")

        await pool.query(query11);
        console.log("query 12 done")

        await pool.query(query13);
        console.log("query 13 done")

        await pool.query(query14);
        console.log("query 14 done")

        await pool.query(query15);
        console.log("query 15 done")

        await pool.query(query16);
        console.log("query 16 done")        

        return "All Tables are Created";
    } catch (error) {
        console.error("Error creating tables:", error);
        throw error;
    }
};
