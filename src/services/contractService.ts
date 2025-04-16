
import { ethers } from 'ethers';
import { toast } from 'sonner';
import HotelBookingAbi from '../contracts/HotelBooking.json';

// Contract configuration
// Note: These values would be set after deploying the contract to a network
export const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with actual contract address after deployment
export const CONTRACT_ABI = HotelBookingAbi.abi;

// Interface for booking details
export interface BookingDetails {
  checkInDate: Date;
  checkOutDate: Date;
  hotelId: string;
  price: number;
  amenities: {
    ac: boolean;
    wifi: boolean;
    breakfast: boolean;
    seaView: boolean;
    extraBed: boolean;
  };
}

// Get ethers provider and signer
const getProviderAndSigner = async () => {
  try {
    if (!window.ethereum) {
      toast.error('MetaMask not detected. Please install MetaMask to use this feature.');
      throw new Error('No ethereum provider detected');
    }
    
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return { provider, signer };
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    toast.error('Failed to connect to wallet. Please try again.');
    throw error;
  }
};

// Get contract instance
const getContract = async () => {
  const { signer } = await getProviderAndSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

// Book a hotel room
export const bookHotel = async (bookingDetails: BookingDetails): Promise<number> => {
  try {
    const contract = await getContract();
    
    // Convert dates to UNIX timestamps
    const checkInTimestamp = Math.floor(bookingDetails.checkInDate.getTime() / 1000);
    const checkOutTimestamp = Math.floor(bookingDetails.checkOutDate.getTime() / 1000);
    
    // Calculate the price in wei (assuming price is in ETH)
    const priceInWei = ethers.parseEther(bookingDetails.price.toString());
    
    const tx = await contract.bookHotel(
      bookingDetails.hotelId,
      checkInTimestamp,
      checkOutTimestamp,
      bookingDetails.amenities.ac,
      bookingDetails.amenities.wifi,
      bookingDetails.amenities.breakfast,
      bookingDetails.amenities.seaView,
      bookingDetails.amenities.extraBed,
      { value: priceInWei }
    );
    
    toast.info('Booking transaction submitted to blockchain. Please wait for confirmation...');
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    // Find the BookingCreated event to get the booking ID
    const event = receipt.events.find((event: any) => event.event === 'BookingCreated');
    const bookingId = event.args.bookingId.toNumber();
    
    toast.success('Hotel booking confirmed on blockchain!');
    return bookingId;
  } catch (error: any) {
    console.error('Error booking hotel:', error);
    toast.error(`Booking failed: ${error.message || 'Unknown error'}`);
    throw error;
  }
};

// Get booking details
export const getBookingDetails = async (bookingId: number) => {
  try {
    const contract = await getContract();
    const booking = await contract.getBooking(bookingId);
    
    // Parse booking data and return in a more usable format
    return {
      id: booking[0].toNumber(),
      guest: booking[1],
      hotelId: booking[2],
      checkInDate: new Date(booking[3].toNumber() * 1000),
      checkOutDate: new Date(booking[4].toNumber() * 1000),
      amount: ethers.formatEther(booking[5]),
      status: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Refunded'][booking[6]],
      amenities: {
        ac: booking[7],
        wifi: booking[8],
        breakfast: booking[9],
        seaView: booking[10],
        extraBed: booking[11]
      }
    };
  } catch (error) {
    console.error('Error fetching booking details:', error);
    toast.error('Failed to fetch booking details');
    throw error;
  }
};

// Get user's bookings
export const getUserBookings = async (userAddress: string) => {
  try {
    const contract = await getContract();
    const bookingIds = await contract.getUserBookings(userAddress);
    
    // Fetch details for each booking ID
    const bookingPromises = bookingIds.map((id: any) => 
      getBookingDetails(id.toNumber())
    );
    
    return await Promise.all(bookingPromises);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    toast.error('Failed to fetch your bookings');
    throw error;
  }
};

// Cancel a booking
export const cancelBooking = async (bookingId: number) => {
  try {
    const contract = await getContract();
    const tx = await contract.cancelBooking(bookingId);
    
    toast.info('Cancellation request submitted. Please wait for confirmation...');
    await tx.wait();
    toast.success('Booking successfully cancelled!');
    
    return true;
  } catch (error: any) {
    console.error('Error cancelling booking:', error);
    toast.error(`Cancellation failed: ${error.message || 'Unknown error'}`);
    throw error;
  }
};

// Get ethereum address of connected wallet
export const getConnectedAddress = async (): Promise<string> => {
  try {
    const { signer } = await getProviderAndSigner();
    return await signer.getAddress();
  } catch (error) {
    console.error('Error getting connected address:', error);
    throw error;
  }
};

