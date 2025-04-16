
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HotelBooking {
    // Booking status
    enum Status { Pending, Confirmed, Completed, Cancelled, Refunded }
    
    // Booking structure
    struct Booking {
        uint id;
        address guest;
        string hotelId;
        uint256 checkInDate;
        uint256 checkOutDate;
        uint256 amount;
        Status status;
        bool amenityAC;
        bool amenityWifi;
        bool amenityBreakfast;
        bool amenitySeaView;
        bool amenityExtraBed;
    }
    
    // Mapping of booking ID to Booking
    mapping(uint => Booking) public bookings;
    uint public bookingCounter;
    
    // Mapping of hotel ID to owner
    mapping(string => address) public hotelOwners;
    
    // Events
    event BookingCreated(uint bookingId, address guest, string hotelId, uint256 amount);
    event BookingConfirmed(uint bookingId);
    event BookingCompleted(uint bookingId);
    event BookingCancelled(uint bookingId);
    event BookingRefunded(uint bookingId, uint256 amount);
    
    // Owner of the contract (platform)
    address public owner;
    uint256 public platformFeePercent = 2; // 2% platform fee
    
    constructor() {
        owner = msg.sender;
        bookingCounter = 1;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the platform owner can call this function");
        _;
    }
    
    modifier onlyHotelOwner(string memory hotelId) {
        require(msg.sender == hotelOwners[hotelId], "Only the hotel owner can call this function");
        _;
    }
    
    function registerHotel(string memory hotelId) external {
        // Only allow registering if not already registered or is the platform owner
        require(hotelOwners[hotelId] == address(0) || msg.sender == owner, "Hotel already registered");
        hotelOwners[hotelId] = msg.sender;
    }
    
    function bookHotel(
        string memory hotelId, 
        uint256 checkInDate, 
        uint256 checkOutDate,
        bool amenityAC,
        bool amenityWifi,
        bool amenityBreakfast,
        bool amenitySeaView,
        bool amenityExtraBed
    ) external payable {
        // Require valid dates
        require(checkOutDate > checkInDate, "Check-out date must be after check-in date");
        require(checkInDate > block.timestamp, "Check-in date must be in the future");
        
        // Store the booking
        uint bookingId = bookingCounter;
        bookings[bookingId] = Booking({
            id: bookingId,
            guest: msg.sender,
            hotelId: hotelId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            amount: msg.value,
            status: Status.Pending,
            amenityAC: amenityAC,
            amenityWifi: amenityWifi,
            amenityBreakfast: amenityBreakfast,
            amenitySeaView: amenitySeaView,
            amenityExtraBed: amenityExtraBed
        });
        
        // Increment booking ID counter
        bookingCounter++;
        
        // Emit event
        emit BookingCreated(bookingId, msg.sender, hotelId, msg.value);
    }
    
    function confirmBooking(uint bookingId) external {
        Booking storage booking = bookings[bookingId];
        require(booking.id != 0, "Booking does not exist");
        require(booking.status == Status.Pending, "Booking is not pending");
        
        // Only hotel owner or platform can confirm
        require(msg.sender == hotelOwners[booking.hotelId] || msg.sender == owner, "Not authorized");
        
        booking.status = Status.Confirmed;
        emit BookingConfirmed(bookingId);
    }
    
    function completeStay(uint bookingId) external {
        Booking storage booking = bookings[bookingId];
        require(booking.id != 0, "Booking does not exist");
        require(booking.status == Status.Confirmed, "Booking is not confirmed");
        
        // Only hotel owner or platform can complete
        require(msg.sender == hotelOwners[booking.hotelId] || msg.sender == owner, "Not authorized");
        
        booking.status = Status.Completed;
        
        // Calculate platform fee
        uint256 platformFee = (booking.amount * platformFeePercent) / 100;
        uint256 hotelAmount = booking.amount - platformFee;
        
        // Transfer funds to hotel owner and platform
        payable(hotelOwners[booking.hotelId]).transfer(hotelAmount);
        payable(owner).transfer(platformFee);
        
        emit BookingCompleted(bookingId);
    }
    
    function cancelBooking(uint bookingId) external {
        Booking storage booking = bookings[bookingId];
        require(booking.id != 0, "Booking does not exist");
        require(booking.status == Status.Pending || booking.status == Status.Confirmed, "Cannot cancel at this stage");
        
        // Only guest, hotel owner or platform can cancel
        require(
            msg.sender == booking.guest || 
            msg.sender == hotelOwners[booking.hotelId] || 
            msg.sender == owner, 
            "Not authorized"
        );
        
        booking.status = Status.Cancelled;
        emit BookingCancelled(bookingId);
    }
    
    function refundBooking(uint bookingId) external onlyOwner {
        Booking storage booking = bookings[bookingId];
        require(booking.id != 0, "Booking does not exist");
        require(booking.status == Status.Cancelled, "Booking is not cancelled");
        
        uint256 amount = booking.amount;
        booking.status = Status.Refunded;
        
        // Transfer funds back to guest
        payable(booking.guest).transfer(amount);
        
        emit BookingRefunded(bookingId, amount);
    }
    
    function getBooking(uint bookingId) external view returns (
        uint id,
        address guest,
        string memory hotelId,
        uint256 checkInDate,
        uint256 checkOutDate,
        uint256 amount,
        Status status,
        bool amenityAC,
        bool amenityWifi,
        bool amenityBreakfast,
        bool amenitySeaView,
        bool amenityExtraBed
    ) {
        Booking storage booking = bookings[bookingId];
        require(booking.id != 0, "Booking does not exist");
        
        return (
            booking.id,
            booking.guest,
            booking.hotelId,
            booking.checkInDate,
            booking.checkOutDate,
            booking.amount,
            booking.status,
            booking.amenityAC,
            booking.amenityWifi,
            booking.amenityBreakfast,
            booking.amenitySeaView,
            booking.amenityExtraBed
        );
    }
    
    function getUserBookings(address user) external view returns (uint[] memory) {
        // First, count bookings for this user
        uint count = 0;
        for (uint i = 1; i < bookingCounter; i++) {
            if (bookings[i].guest == user) {
                count++;
            }
        }
        
        // Then create and populate the array
        uint[] memory userBookingIds = new uint[](count);
        uint index = 0;
        for (uint i = 1; i < bookingCounter; i++) {
            if (bookings[i].guest == user) {
                userBookingIds[index] = i;
                index++;
            }
        }
        
        return userBookingIds;
    }
    
    // Allow contract to receive ETH
    receive() external payable {}
}
