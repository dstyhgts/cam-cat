import React, { useState, useRef, useEffect } from 'react';
import '../Components2/MainGrid.css';
import '../Components2/HowItWorksButton.css';
import { PopupButton } from '@typeform/embed-react';

const EVENT_HOURS = 4; // Default event duration for calculations

const SERVICES = [
    {
    key: 'photo_video',
      title: 'PHOTO + VIDEO',
    description: 'Photographers, Videographers... A mix between high-quality, vintage styles, candid...',
    price: 6450,
    addOns: [
      { key: 'photos', label: '800+ edited photos (digital + vintage)', price: 1800 },
      { key: 'highlight', label: 'Highlight reel (3-5 min)', price: 700 },
      { key: 'shortfilm', label: 'Short film (10-15 min)', price: 2800 },
      { key: 'raw', label: 'All raw footage delivered', price: 1050 },
    ],
    priceLabel: 'Starts at $2250',
  },
  {
    key: 'booths',
    title: 'BOOTHS!',
    description: 'Photo Booths... Video Booths... and Phone Booths...',
    price: 0, // Calculated dynamically
    addOns: [], // Handled in sidebar logic
    priceLabel: 'Explore our Booth options.',
  },
  {
    key: 'camera_rentals',
      title: 'CAMERA CATERING*',
    description: 'Our one-of-a-kind service. Ditch the disposable cameras, rent digicams and camcorders instead.',
    price: 4500,
    addOns: [
      { key: 'cameras', label: '+10 cameras', price: 800 },
      { key: 'bar', label: 'Camera bar', price: 1000 },
      { key: 'cam_tender', label: 'Cam tender', price: 800 },
      { key: 'edited_photos', label: 'Edited photos included', price: 250 },
      { key: 'video_recap', label: 'Video recap add-ons', price: 250 },
    ],
    priceLabel: 'Price starts at $2500',
  },
  {
    key: 'content_editing',
      title: 'CONTENT EDITING',
    description: 'Premium content editing for all Cam-Catering content and Other Vendor content.',
    price: 4100,
    addOns: [
      { key: 'captured', label: 'All captured content edited', price: 2000 },
      { key: 'vendor', label: 'Other vendor content included', price: 1100 },
      { key: 'delivery', label: 'Full delivery of edited files', price: 1000 },
    ],
    priceLabel: 'Pricing starts at $1500',
    },
  ];


function ServiceButton({ service, selected, onToggle, onHover, hover }) {
  return (
    <div
      className={`hiw-container${selected ? ' selected' : ''}`}
      style={{ position: 'relative', marginBottom: 0, minHeight: 120, cursor: 'pointer', width: '100%', maxWidth: 256 }}
      onClick={() => onToggle(service.key)}
      onMouseEnter={() => onHover(service.key)}
      onMouseLeave={() => onHover(null)}
      tabIndex={0}
      aria-pressed={selected}
    >
      <div className="hiw-background" />
      <div className="hiw-card hiw-default" style={{ minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h6 style={{ fontSize: 24, margin: 0 }}>{service.title}</h6>
        <p className="hiw-subtext" style={{ fontSize: 15, margin: '8px 0 0 0' }}>{service.description}</p>
        <span className="hiw-subtext" style={{ fontWeight: 700, color: 'var(--button-text-color)', fontSize: 16 }}>{service.priceLabel}</span>
      </div>
      {service.key === 'booths' && (
        <img
          src="/assets/CLICK-ME.svg"
          alt="Click me"
          style={{ position: 'absolute', top: 6, right: -8, width: 130, height: 'auto', pointerEvents: 'none', zIndex: 30 }}
        />
      )}
      {(hover || selected) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: selected ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.10)',
            borderRadius: 30,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {selected ? (
            hover ? (
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ filter: 'drop-shadow(0 2px 8px #2228)' }}><circle cx="32" cy="32" r="30" fill="#E74C3C" stroke="#fff" strokeWidth="4"/><path d="M22 22L42 42M42 22L22 42" stroke="#fff" strokeWidth="6" strokeLinecap="round"/></svg>
            ) : (
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ filter: 'drop-shadow(0 2px 8px #2228)' }}><circle cx="32" cy="32" r="30" fill="#66C4CC" stroke="#fff" strokeWidth="4"/><path d="M20 34L29 43L44 24" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )
          ) : (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ filter: 'drop-shadow(0 2px 8px #2228)' }}><circle cx="32" cy="32" r="30" fill="#66C4CC" stroke="#fff" strokeWidth="4"/><path d="M20 34L29 43L44 24" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </div>
      )}
    </div>
  );
}

function AddOnToggle({ label, checked, onToggle, price, included, perHour }) {
  const [hover, setHover] = useState(false);
  let priceDisplay = '';
  if (included) priceDisplay = 'included';
  else if (price != null && perHour) priceDisplay = `$${price}/hr`;
  else if (price != null) priceDisplay = `$${price}`;
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, cursor: 'pointer', gap: 8 }}
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
    >
      {checked ? (
        hover ? (
          <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="#E74C3C" stroke="#fff" strokeWidth="2"/><path d="M7 7L15 15M15 7L7 15" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="#66C4CC" stroke="#fff" strokeWidth="2"/><path d="M6 12l3 3 6-6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )
      ) : (
        <span style={{ width: 22, height: 22, display: 'inline-block', border: '2px solid #aaa', borderRadius: '50%' }} />
      )}
      <span style={{ fontSize: 15, color: checked ? '#222' : '#aaa', textDecoration: checked ? 'none' : 'line-through' }}>{label}</span>
      <span style={{ fontSize: 14, color: checked ? '#66C4CC' : '#aaa', marginLeft: 6 }}>{priceDisplay}</span>
    </div>
  );
}

function useAnimatedPrice() {
  const [anim, setAnim] = useState(null); // {delta, color}
  const timeoutRef = useRef();
  const show = (delta) => {
    setAnim({
      delta,
      color: delta > 0 ? '#27ae60' : '#e74c3c',
      sign: delta > 0 ? '+' : '-',
    });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAnim(null), 1200);
  };
  return [anim, show];
}

// Update the ToggleCircle component so the border (stroke) is always #e0e0e0 for both checked and unchecked states
function ToggleCircle({ checked }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22">
      <circle cx="11" cy="11" r="10" fill={checked ? '#66C4CC' : '#fff'} stroke="#e0e0e0" strokeWidth="2"/>
      {checked && (
        <path d="M6 12l3 3 6-6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      )}
    </svg>
  );
}

// 2. A-La-Carte Bubble for quantity and toggling
function AlaCarteBubble({ quantity, onAdd, onSubtract }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {quantity > 0 && (
        <button style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #e0e0e0', background: '#fff', color: '#222', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 2 }} onClick={onSubtract}>-</button>
      )}
      <div onClick={quantity === 0 ? onAdd : undefined} style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #e0e0e0', background: quantity > 0 ? '#66C4CC' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 700, fontSize: 15, color: '#fff', userSelect: 'none' }}>
        {quantity === 0 ? '' : quantity === 1 ? (
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M4 8.5l3 3 5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        ) : quantity}
      </div>
      {quantity > 0 && (
        <button style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #e0e0e0', background: '#fff', color: '#222', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 2 }} onClick={onAdd}>+</button>
      )}
    </div>
  );
}

export default function BusinessOfferings() {
  // Initialize with Camera Catering selected by default
  const [selected, setSelected] = useState(['camera_rentals']); // [serviceKey]
  const [hovered, setHovered] = useState(null); // serviceKey
  // Initialize addOnState with camera_rentals default state
  const [addOnState, setAddOnState] = useState({ camera_rentals: { full: false } }); // { serviceKey: { full: true, addOns: { addOnKey: true/false } } }
  const [showBundles, setShowBundles] = useState(false);
  const [anim, showAnim] = useAnimatedPrice();
  const prevTotalRef = useRef(0);
  // 1. Add state for the Camera Rentals note
  const [cameraRentalsNote, setCameraRentalsNote] = useState('2-hour minimum, 4th hour free');
  // Add state for hours for photo_video
  const [photoVideoHours, setPhotoVideoHours] = useState(8);

  // Add state for a-la-carte quantities for content editing
  const [contentEditingAlaCarte, setContentEditingAlaCarte] = useState({
    photo25: 0,
    photo100: 0,
    shortfilm: 0,
    vertical: 0,
    carousel: 0,
    branding: 0,
  });

  // 1. Add state for Content Editing package toggle
  const [contentEditingBasicOn, setContentEditingBasicOn] = useState(true);

  // 2. Define included items for Basic and Full
  const contentEditingBasicItems = [
    { key: 'verticals', label: '2x Vertical Videos' },
    { key: 'carousels', label: '1x Carousel' },
    { key: 'photos', label: '100x Edited Photos' },
  ];
  const contentEditingFullItems = [
    { key: 'verticals', label: '6x Vertical Videos (15-60 Seconds)' },
    { key: 'carousels', label: '2x Viral Carousel Posts (6-12 Slides)' },
    { key: 'shortfilm', label: '2-5 minute "Short Film" (Horizontal)' },
    { key: 'photos', label: '500x Edited Photos' },
    { key: 'branding', label: 'Custom Partial-Branding' },
  ];

  // Content Editing a-la-carte items
  const contentEditingAlaCarteItems = [
    { key: 'photo25', label: '25x Photo Edits', price: 150 },
    { key: 'photo100', label: '100x Photo Edits', price: 650 },
    { key: 'vertical', label: 'Vertical Video Reel/TikTok (15-60 Seconds)', price: 350 },
    { key: 'carousel', label: 'Carousel Post (6-12 Slides)', price: 350 },
    { key: 'shortfilm', label: 'Short Film/Recap Video (2-5 Minutes)', price: 1250 },
    { key: 'branding', label: 'Custom Branding', price: 1100 },
  ];

  // Camera Rental full package items
  const cameraRentalFullItems = [
    { key: 'cameras25', label: '30 Total Cameras' },
    { key: 'polaroid5', label: '10x Instax Cameras' },
    { key: 'film5', label: '5x Film Cameras' },
    { key: 'qr_codes', label: 'QR-CODES' },
    { key: 'bar', label: '+ The Camera Bar' },
    { key: 'cam_tender', label: '+ Cam-Tender' },
    { key: 'photos500', label: 'Up to 500 Edited photos.' },
    { key: 'vintage', label: '"Home-Video" Recap"' },
    { key: 'recap', label: '"Photo-Dump" Video' },
    { key: 'delivery72', label: '72 Hour Delivery' },
    // { key: 'plusMore', label: '+ More!' },
  ];
  // Camera Rental Digital Package items (formerly Basic Package)
  const cameraRentalDigitalItems = [
    { label: '12x Digital Cameras' },
    { label: '3x VHS Camcorders' },
    // { label: '250 Edited photos.' },
    // { label: '"Home-Video" Recap' },
    // { label: '"Photo-Dump" Recap Video' },
    { label: 'All Raw Video + Photos' },
    { label: '36 Hour Delivery' },
  ];
  // Camera Rental Print Package items
  const cameraRentalPrintItems = [
    { label: '8x Instax Insta-Print Cameras' },
    { label: '16x Instax photo paper packs' },
    { label: 'Up to 320 printable photos!' },
  ];
  // Camera Rental full package included quantities
  const cameraRentalFullIncluded = {
    bar: 1, // Camera Bar for 4 hours
    cam_tender: 1, // 1 Cam-Tender included in full package
    polaroid5: 2, // 5x Polaroid Cameras for 4 hours
    film5: 1, // 5x Film Cameras for 4 hours
    cameras5: 0, // Not included in full package
    cameras3: 0, // Not included in full package
    weekend: 0, // Not included in full package
    qr_codes: 1, // QR-CODES included in full package
  };
  // Update cameraRentalAlaCarteItems to separate Camera Bar and Cam-Tender, and allow multiple Cam-Tenders
  const cameraRentalAlaCarteItems = [
    { key: 'bar', label: 'The Camera Bar', price: 500, perHour: true },
    { key: 'cam_tender', label: 'Cam-Tender', price: 200, perHour: true },
    { key: 'polaroid5', label: '+5 Instax Cams', price: 350, perHour: true },
    { key: 'film5', label: '+5 Film Cams', price: 350, perHour: true },
    { key: 'cameras5', label: '+5 Digicams', price: 150, perHour: true },
    { key: 'cameras3', label: '+3 Camcorders', price: 180, perHour: true },
    { key: 'weekend', label: 'Weekend Rental (3-Days)', price: 2050, perHour: false },
    { key: 'qr_codes', label: 'QR-CODES', price: 150, perHour: false },
  ];
  const CAMERA_RENTAL_HOURS = 4;
  const [cameraRentalAlaCarte, setCameraRentalAlaCarte] = useState({
    bar: 0,
    cam_tender: 0,
    polaroid5: 0,
    film5: 0,
    cameras5: 0,
    qr_codes: 0,
  });
  // Add state for cameraRentalDigitalOn (formerly Basic, now Digital Package)
  const [cameraRentalDigitalOn, setCameraRentalDigitalOn] = useState(true);
  // Add state for cameraRentalPrintOn (new Print Package)
  const [cameraRentalPrintOn, setCameraRentalPrintOn] = useState(false);

  // Add state for toggling add-ons visibility
  const [showAddOns, setShowAddOns] = useState(false);

  // Define add-ons for video and photo booths
  const videoBoothAddOns = [
    { key: 'instant_download', label: 'Instant Download', price: 540 },
    { key: 'branded_microphones', label: 'Branded Microphones', price: 330 },
  ];

  const photoBoothAddOns = [
    { key: 'photo_magnet_prints', label: 'Photo-Magnet Prints', price: 750 },
  ];

  // Add state for toggling add-ons visibility for video and photo booths
  const [showVideoAddOns, setShowVideoAddOns] = useState(false);
  const [showPhotoAddOns, setShowPhotoAddOns] = useState(false);

  // Add state for photo booth and video booth add-ons
  const [photoBoothAddOnsState, setPhotoBoothAddOnsState] = useState({ photo_magnet_prints: false });
  const [videoBoothAddOnsState, setVideoBoothAddOnsState] = useState({ instant_download: false, branded_microphones: false });

  // 2. Add state for Booths toggles and add-ons
  const defaultBoothState = {
    photo: true,
    video: false,
    phone: false,
    photoAddOns: { photo_magnet_prints: false, rotary: false },
    videoAddOns: { instant_download: false, branded_microphones: false, rotary: false },
    phoneAddOns: { rotary: false, second: false },
    showPhotoAddOns: false,
    showVideoAddOns: false,
    showPhoneAddOns: false,
  };
  const [boothState, setBoothState] = useState(defaultBoothState);

  // --- Fix for 2 & 3: Always reset add-ons to 0 when toggling to Digital, and always animate the full price difference including add-ons when switching between Full and Digital ---
  const handleCameraRentalPackageToggle = (isFull) => {
    // Calculate previous total (with current add-ons)
    const prevTotal = getServiceTotal(
      SERVICES.find(s => s.key === 'camera_rentals'),
      { ...addOnState.camera_rentals, full: cameraRentalDigitalOn ? false : true },
      0
    ).total + Object.entries(cameraRentalAlaCarte).reduce((sum, [key, qty]) => {
      const item = cameraRentalAlaCarteItems.find(i => i.key === key);
      return sum + (qty * item.price * (item.perHour ? CAMERA_RENTAL_HOURS : 1));
    }, 0);

    // Set new add-on state
    let newAlaCarte = isFull ? cameraRentalAlaCarte : { bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0 };
    if (!isFull) {
      newAlaCarte = { bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0 };
      setCameraRentalDigitalOn(true); // Reset to digital package
    }

    // Calculate new total (with new add-on state)
    const newTotal = getServiceTotal(
      SERVICES.find(s => s.key === 'camera_rentals'),
      { ...addOnState.camera_rentals, full: isFull },
      0
    ).total + Object.entries(newAlaCarte).reduce((sum, [key, qty]) => {
      const item = cameraRentalAlaCarteItems.find(i => i.key === key);
      return sum + (qty * item.price * (item.perHour ? CAMERA_RENTAL_HOURS : 1));
    }, 0);

    // Animate the difference
    showAnim(newTotal - prevTotal);

    // Update state
    setAddOnState((prev) => ({
      ...prev,
      camera_rentals: { ...prev.camera_rentals, full: isFull },
    }));
    setCameraRentalAlaCarte(newAlaCarte);
    setShowAddOns(isFull); // Toggle add-ons visibility
  };

  // Handle initial addition of Camera Rentals
  const handleToggleCameraRentals = () => {
    const prevTotal = total;
    const isSelected = selected.includes('camera_rentals');
    const newSelected = isSelected
      ? selected.filter((key) => key !== 'camera_rentals')
      : [...selected, 'camera_rentals'];

    const newAddOnState = { ...addOnState, camera_rentals: { full: false } };
    const selectedServices = SERVICES.filter((s) => newSelected.includes(s.key));
    const serviceTotals = selectedServices.map((s) => {
      if (s.key === 'camera_rentals') {
        const { total: t } = getServiceTotal(s, newAddOnState[s.key], 0);
        return { total: t };
      }
      return { total: getServiceTotal(s, addOnState[s.key]?.addOns) };
    });
    const newTotal = serviceTotals.reduce((sum, t) => sum + t.total, 0);
    showAnim(newTotal - prevTotal);
    setSelected(newSelected);
    setAddOnState(newAddOnState);
    setCameraRentalAlaCarte({ bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0, qr_codes: 0 });
    if (!isSelected) {
      setCameraRentalDigitalOn(true); // Ensure Digital Package is selected by default
    }
  };

  // Enhance visual feedback for add-on toggles
  const handleCameraRentalAddOnChange = (itemKey, newQty) => {
    const prevQty = cameraRentalAlaCarte[itemKey] || 0;
    const deltaQty = newQty - prevQty;
    if (deltaQty === 0) return; // No change
    const item = cameraRentalAlaCarteItems.find(i => i.key === itemKey);
    const delta = deltaQty * item.price * (item.perHour ? CAMERA_RENTAL_HOURS : 1);
    showAnim(delta);
    setCameraRentalAlaCarte(prev => ({ ...prev, [itemKey]: newQty }));
    // Add animation for toggle appearance
    const toggleElement = document.getElementById(`toggle-${itemKey}`);
    if (toggleElement) {
      toggleElement.classList.add('animate-toggle');
      setTimeout(() => toggleElement.classList.remove('animate-toggle'), 300);
    }
  };

  // Refactor handleToggle for content_editing to update both addOnState and selected synchronously
  const handleToggle = (key) => {
    if (key === 'content_editing') {
      // Always reset to Basic state when adding
      const included = { photo25: 0, photo100: 1, shortfilm: 0, vertical: 2, carousel: 1, branding: 0 };
      const newAddOnState = {
        ...addOnState,
        [key]: {
          full: false,
          addOns: Object.fromEntries(contentEditingFullItems.map((a) => [a.key, false]))
        }
      };
      const newSelected = selected.includes(key)
        ? selected.filter((k) => k !== key)
        : [...selected, key];
      setAddOnState(newAddOnState);
      setContentEditingAlaCarte(included);
      setContentEditingBasicOn(true);
      setSelected(newSelected);
      // Animation: always showAnim(1500) on initial add
      if (!selected.includes(key)) {
        showAnim(1500);
      } else {
        // If removing, animate the difference
        const service = SERVICES.find((s) => s.key === key);
        const prevTotal = getServiceTotal(service, addOnState[key]?.addOns, 0);
        showAnim(-prevTotal);
      }
      return;
    }
    if (key === 'camera_rentals') {
      const service = SERVICES.find((s) => s.key === 'camera_rentals');
      const isSelected = selected.includes('camera_rentals');
      if (isSelected) {
        const { total: currentTotal } = getServiceTotal(service, addOnState.camera_rentals || { full: cameraRentalDigitalOn }, 0);
        showAnim(-currentTotal);
        setSelected(selected.filter((k) => k !== 'camera_rentals'));
        setAddOnState((prev) => {
          const next = { ...prev };
          delete next.camera_rentals;
          return next;
        });
        setCameraRentalDigitalOn(true);
        setCameraRentalPrintOn(false);
        setCameraRentalAlaCarte({ bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0, qr_codes: 0 });
      } else {
        const { total: addPrice } = getServiceTotal(service, { full: false }, 0);
        showAnim(addPrice);
        setSelected([...selected, 'camera_rentals']);
        setAddOnState((prev) => ({ ...prev, camera_rentals: { full: false } }));
        setCameraRentalDigitalOn(true);
        setCameraRentalPrintOn(false);
        setCameraRentalAlaCarte({ bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0, qr_codes: 0 });
      }
      return;
    }
    if (key === 'booths') {
      if (selected.includes('booths')) {
        setSelected(selected.filter((k) => k !== 'booths'));
      } else {
        setSelected([...selected, 'booths']);
        // Force recalculation by resetting boothState (even if already default)
        setBoothState(state => ({ ...defaultBoothState }));
        // Animate the price add for initial state
        setTimeout(() => {
          const priceToAdd = getServiceTotal(SERVICES.find(s => s.key === 'booths'), defaultBoothState);
          showAnim(priceToAdd);
        }, 0);
      }
      return;
    }
    setSelected((prev) => {
      if (prev.includes(key)) {
        // Remove service
        const newAddOnState = { ...addOnState };
        delete newAddOnState[key];
        setAddOnState(newAddOnState);
        // Reset add-on states
        if (key === 'photo_booth') {
          setPhotoBoothAddOnsState({ photo_magnet_prints: false });
        } else if (key === 'video_booth') {
          setVideoBoothAddOnsState({ instant_download: false, branded_microphones: false });
        } else if (key === 'camera_rentals') {
          setCameraRentalDigitalOn(true); // Reset to Digital Package
          setCameraRentalPrintOn(false);
          setCameraRentalAlaCarte({ bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0, qr_codes: 0 });
        }
        // Animate price drop
        const service = SERVICES.find((s) => s.key === key);
        showAnim(-getServiceTotal(service, addOnState[key]?.addOns));
        return prev.filter((k) => k !== key);
      } else {
        // Add service, default to full package
        if (key === 'photo_video') {
          const initialAddOns = {
            photographer: true,
            videographer: false,
            raw: true, // 'All Raw Footage and Photos' toggled on
            ...Object.fromEntries(SERVICES.find((s) => s.key === key).addOns.filter(a => !['photographer', 'videographer', 'raw'].includes(a.key)).map((a) => [a.key, false]))
          };
          setAddOnState((prevState) => ({
            ...prevState,
            [key]: {
              full: false,
              addOns: initialAddOns
            }
          }));
          let priceToAdd = getServiceTotal(SERVICES.find((s) => s.key === key), initialAddOns);
          showAnim(priceToAdd);
          return [...prev, key];
        }
        setAddOnState((prevState) => ({
          ...prevState,
          [key]: {
            full: false,
            addOns: Object.fromEntries(SERVICES.find((s) => s.key === key).addOns.map((a) => [a.key, false]))
          }
        }));
        const service = SERVICES.find((s) => s.key === key);
        let initialAddOns = Object.fromEntries(service.addOns.map((a) => [a.key, false]));
        let priceToAdd = getServiceTotal(service, initialAddOns);
        showAnim(priceToAdd);
        return [...prev, key];
      }
    });
  };

  // 1. Fix Full Editing Package logic: when toggled ON, all full package items are checked (not crossed out)
  const handleFullToggle = (serviceKey) => {
    setAddOnState((prev) => {
      const service = SERVICES.find((s) => s.key === serviceKey);
      const wasFull = prev[serviceKey].full;
      if (serviceKey === 'photo_video') {
        // Toggle all items for full package
        if (!wasFull) {
          // Toggling ON: set all items to true
          const allOnAddOns = Object.fromEntries(service.addOns.map((a) => [a.key, true]));
          showAnim(6450); // Example price for full package
          return {
            ...prev,
            [serviceKey]: {
              full: true,
              addOns: allOnAddOns,
            },
          };
        } else {
          // Toggling OFF: set all items to false
          const allOffAddOns = Object.fromEntries(service.addOns.map((a) => [a.key, false]));
          showAnim(-6450); // Example price for full package
          return {
            ...prev,
            [serviceKey]: {
              full: false,
              addOns: allOffAddOns,
            },
          };
        }
      }
      // For other services, keep previous logic
      const full = !prev[serviceKey].full;
      const prevTotal = getServiceTotal(service, prev[serviceKey].addOns);
      const newAddOns = Object.fromEntries(service.addOns.map((a) => [a.key, full]));
      const newTotal = getServiceTotal(service, newAddOns);
      showAnim(newTotal - prevTotal);
      return {
        ...prev,
        [serviceKey]: {
          full,
          addOns: newAddOns,
        },
      };
    });
  };

  // Handle add-on toggle
  const handleAddOnToggle = (serviceKey, addOnKey) => {
    setAddOnState((prev) => {
      const service = SERVICES.find((s) => s.key === serviceKey);
      const prevAddOns = { ...prev[serviceKey].addOns };
      const wasChecked = !!prevAddOns[addOnKey];
      let newAddOns = { ...prevAddOns, [addOnKey]: !wasChecked };
      // For photo_video, ensure at least one of photographer or videographer is always selected
      if (serviceKey === 'photo_video') {
        if (!newAddOns['photographer'] && !newAddOns['videographer']) {
          // Prevent unchecking the last one
          return prev;
        }
        // Raw footage is always included if either is selected
        if (newAddOns['photographer'] || newAddOns['videographer']) {
          newAddOns['raw'] = true;
        } else {
          newAddOns['raw'] = false;
        }
      }
      const allOn = service.addOns.every((a) => newAddOns[a.key]);
      const prevTotal = getServiceTotal(service, prevAddOns);
      const newTotal = getServiceTotal(service, newAddOns);
      showAnim(newTotal - prevTotal);
      return {
        ...prev,
        [serviceKey]: {
          full: allOn,
          addOns: newAddOns
        }
      };
    });
  };

  // Update getServiceTotal to accept the full addOnState object for Content Editing
  function getServiceTotal(service, addOnsOverride, bundleDiscount = 0) {
    // Skip generic fallbacks for services with custom pricing logic
    const isCustomPriced = ['camera_rentals', 'booths', 'photo_video', 'content_editing'].includes(service.key);
    if (!isCustomPriced) {
      if (!addOnsOverride) return Math.round(service.price * (1 - bundleDiscount));
      if (service.addOns && service.addOns.length > 0 && service.addOns.every((a) => addOnsOverride[a.key])) return Math.round(service.price * (1 - bundleDiscount));
    }
    if (service.key === 'camera_rentals') {
      let total = 0;
      let subtotal = 0;
      // Digital Package (formerly Basic) is $2200 if digital is ON
      if (cameraRentalDigitalOn && !addOnsOverride.full) {
        total += 2200;
        subtotal += 2200;
      }
      // Print Package is $2600 if print is ON
      if (cameraRentalPrintOn && !addOnsOverride.full) {
        total += 2500;
        subtotal += 2500;
      }
      // Full package: $4500 flat if full is ON
      const isFullObj = addOnsOverride && typeof addOnsOverride === 'object' && 'full' in addOnsOverride && 'addOns' in addOnsOverride;
      const full = isFullObj ? addOnsOverride.full : false;
      if (full) {
        total = 4500;
        // Subtotal: sum all included A-La-Carte items at standard rates
        subtotal = 0;
        subtotal += 2500; // 15 Cameras for event duration (part of full package)
        subtotal += 500 * CAMERA_RENTAL_HOURS; // Camera Bar for 4 hours
        subtotal += 350 * CAMERA_RENTAL_HOURS; // 5x Polaroid Cameras for 4 hours
        subtotal += 350 * CAMERA_RENTAL_HOURS; // 5x Film Cameras for 4 hours
        // Add any extra A-La-Carte items (beyond included)
        cameraRentalAlaCarteItems.forEach((item) => {
          const qty = cameraRentalAlaCarte[item.key] || 0;
          const includedQty = cameraRentalFullIncluded[item.key] || 0;
          const extraQty = Math.max(0, qty - includedQty);
          if (item.perHour) {
            total += extraQty * item.price * CAMERA_RENTAL_HOURS;
            subtotal += extraQty * item.price * CAMERA_RENTAL_HOURS;
          } else {
            total += extraQty * item.price;
            subtotal += extraQty * item.price;
          }
        });
        return { total, subtotal };
      }
      // If not full package, add all A-La-Carte items at full rate
      cameraRentalAlaCarteItems.forEach((item) => {
        const qty = cameraRentalAlaCarte[item.key] || 0;
        if (item.perHour) {
          total += qty * item.price * CAMERA_RENTAL_HOURS;
          subtotal += qty * item.price * CAMERA_RENTAL_HOURS;
        } else {
          total += qty * item.price;
          subtotal += qty * item.price;
        }
      });
      return { total, subtotal };
    }
    if (service.key === 'booths') {
      const state = addOnsOverride || {};
      let total = 0;
      // Each booth is 3 hours flat
      if (state.photo) total += 350 * 3;
      if (state.video) total += 350 * 3;
      if (state.phone) total += 400 * 3;
      // Add-ons: flat rate except rotary, which is hourly (3hr)
      if (state.photo && state.photoAddOns?.photo_magnet_prints) total += 750;
      if (state.photo && state.photoAddOns?.rotary) total += 150 * 3;
      if (state.video && state.videoAddOns?.instant_download) total += 540;
      if (state.video && state.videoAddOns?.branded_microphones) total += 330;
      if (state.video && state.videoAddOns?.rotary) total += 150 * 3;
      if (state.phone && state.phoneAddOns?.rotary) total += 150 * 3;
      if (state.phone && state.phoneAddOns?.second) total += 600 * 3;
      // Debug log
      console.log('[BOOTH TOTAL DEBUG]', { boothState: state, total });
      return total;
    }
    if (service.key === 'photo_video') {
      // Photographer and Videographer are always required
      let total = 0;
      // Base pricing uses a 4-hour event duration standard
      if (addOnsOverride['photographer']) {
        total += 4 * 300;
      }
      if (addOnsOverride['videographer']) {
        total += 4 * 300;
      }
      // Add All Raw Footage and Photos if selected
      if (addOnsOverride['raw']) {
        const rawAddOn = service.addOns.find(a => a.key === 'raw');
        if (rawAddOn && rawAddOn.price) total += rawAddOn.price;
      }
      // Add any other add-ons if checked
      total += service.addOns.reduce((sum, a) => {
        if (['photographer', 'videographer', 'raw'].includes(a.key)) return sum;
        if (addOnsOverride[a.key] && a.price) return sum + a.price;
        return sum;
      }, 0);
      return total;
    }
    if (service.key === 'content_editing') {
      let total = 0;
      // If addOnsOverride is an object with full/addOns, use them
      const isFullObj = addOnsOverride && typeof addOnsOverride === 'object' && 'full' in addOnsOverride && 'addOns' in addOnsOverride;
      const full = isFullObj ? addOnsOverride.full : false;
      const included = full
        ? { photo25: 0, photo100: 5, shortfilm: 1, vertical: 6, carousel: 3, branding: 1 }
        : { photo25: 0, photo100: 5, shortfilm: 0, vertical: 6, carousel: 3, branding: 0 };
      if (full) {
        total += 4500;
      } else {
        total += 1500;
      }
      // Only charge for add-ons above included
      total += Math.max(0, contentEditingAlaCarte.photo25 - (included.photo25 || 0)) * 150;
      total += Math.max(0, contentEditingAlaCarte.photo100 - (included.photo100 || 0)) * 650;
      total += Math.max(0, contentEditingAlaCarte.shortfilm - (included.shortfilm || 0)) * 1250;
      total += Math.max(0, contentEditingAlaCarte.vertical - (included.vertical || 0)) * 350;
      total += Math.max(0, contentEditingAlaCarte.carousel - (included.carousel || 0)) * 350;
      total += Math.max(0, contentEditingAlaCarte.branding - (included.branding || 0)) * 1100;
      return total;
    }
    // Otherwise, sum checked add-ons
    return service.addOns.reduce((sum, a) => {
      if (!addOnsOverride[a.key]) return sum;
      if (a.included) return sum; // included, no price
      if (a.price != null && a.perHour) return sum + Math.round(a.price * EVENT_HOURS * (1 - bundleDiscount));
      if (a.price != null) return sum + Math.round(a.price * (1 - bundleDiscount));
      return sum;
    }, 0);
  }

  // Calculate total and discount
  // Sort services so camera_rentals (CAMERA CATERING) always appears first
  const selectedServices = SERVICES.filter((s) => selected.includes(s.key)).sort((a, b) => {
    if (a.key === 'camera_rentals') return -1;
    if (b.key === 'camera_rentals') return 1;
    return 0; // Keep original order for other services
  });
  // Compute totals for all services EXCEPT booths; we'll add booths explicitly to avoid any state sync issues
  const serviceTotals = selectedServices.filter(s => s.key !== 'booths').map((s) => {
    if (s.key === 'camera_rentals') {
      const { total: t, subtotal: st } = getServiceTotal(s, addOnState[s.key], 0);
      return { total: t, subtotal: st };
    }
    if (s.key === 'photo_video') {
      const isFull = addOnState[s.key]?.full;
      if (isFull) {
        // Subtotal equals a-la-carte sum of all items for a 4-hour event
        const staffSubtotal = 4 * 250 * 2; // photographer + videographer
        const addOnSubtotal = (s.addOns || []).reduce((sum, a) => sum + (a.price || 0), 0);
        const subtotal = staffSubtotal + addOnSubtotal;
        const total = 6450;
        const pvDiscount = subtotal > total ? subtotal - total : 0;
        return { total, subtotal, pvDiscount };
      }
      const nonFullTotal = getServiceTotal(s, addOnState[s.key]?.addOns);
      return { total: nonFullTotal, subtotal: nonFullTotal };
    }
    if (s.key === 'content_editing') {
      const isFull = addOnState[s.key]?.full;
      // Define included quantities and a-la-carte prices
      const included = isFull
        ? { photo25: 0, photo100: 5, shortfilm: 1, vertical: 6, carousel: 2, branding: 1 }
        : { photo25: 0, photo100: 1, shortfilm: 0, vertical: 2, carousel: 1, branding: 0 };
      const prices = { photo25: 150, photo100: 650, shortfilm: 1250, vertical: 350, carousel: 350, branding: 1100 };
      let subtotal = 0;
      let total = 0;
      let discount = 0;
      if (isFull) {
        // Subtotal: sum all included add-ons at a-la-carte price + any extras
        Object.keys(included).forEach(key => {
          subtotal += (included[key] || 0) * prices[key];
        });
        Object.keys(contentEditingAlaCarte).forEach(key => {
          subtotal += Math.max(0, contentEditingAlaCarte[key] - (included[key] || 0)) * prices[key];
        });
        // Discount and total logic for Full
        let extras = 0;
        Object.keys(contentEditingAlaCarte).forEach(key => {
          extras += Math.max(0, contentEditingAlaCarte[key] - (included[key] || 0)) * prices[key];
        });
        total = 4500 + extras; // Full package fixed price + extras above included
        discount = 3900; // Display fixed savings for full package
      } else {
        // For Basic, total is $1500 + extras above included
        let extras = 0;
        Object.keys(contentEditingAlaCarte).forEach(key => {
          extras += Math.max(0, contentEditingAlaCarte[key] - (included[key] || 0)) * prices[key];
        });
        subtotal = 1500 + extras;
        total = 1500 + extras;
        discount = 0;
      }
      return { total, subtotal, discount };
    }
    // booths handled separately below
    return { total: getServiceTotal(s, addOnState[s.key]?.addOns), subtotal: getServiceTotal(s, addOnState[s.key]?.addOns) };
  });
  // Add booths total separately (3-hr event-time baked into getServiceTotal)
  const boothTotalForCalc = selected.includes('booths')
    ? getServiceTotal(SERVICES.find(s => s.key === 'booths'), boothState)
    : 0;
  const subtotal = serviceTotals.reduce((sum, t) => sum + (t.subtotal || 0), 0) + boothTotalForCalc;
  const total = serviceTotals.reduce((sum, t) => sum + (t.total || 0), 0) + boothTotalForCalc;
  const contentEditingDiscount = serviceTotals.find(t => t.discount)?.discount || 0;
  const photoVideoDiscount = serviceTotals.find(t => t.pvDiscount)?.pvDiscount || 0;
const discount = selectedServices.some(s => s.key === 'camera_rentals' && addOnState[s.key]?.full) ? subtotal - total : (selectedServices.length >= 2 ? Math.round(subtotal * 0.05) : 0);

// Update discount calculation to ensure both discounts are shown if applicable
let fullPackageSavings = 0;
if (selected.includes('camera_rentals') && addOnState['camera_rentals']?.full) {
  const camService = SERVICES.find(s => s.key === 'camera_rentals');
  const { total: camTotal, subtotal: camSubtotal } = getServiceTotal(camService, addOnState['camera_rentals'], 0);
  fullPackageSavings = Math.max(0, (camSubtotal || 0) - (camTotal || 0));
}
const multiItemDiscount = selectedServices.length >= 2 ? Math.round(total * 0.05) : 0;

  // 1. Add state for opening/closing Content Editing add-on section
  const [showContentEditingAddOns, setShowContentEditingAddOns] = useState(false);

  // 2. Define included quantities for each package
  const contentEditingIncluded = contentEditingBasicOn
    ? { photo25: 0, photo100: 1, shortfilm: 0, vertical: 2, carousel: 1, branding: 0 }
    : { photo25: 0, photo100: 5, shortfilm: 1, vertical: 6, carousel: 2, branding: 1 };

  // 2 & 3. When toggling between Basic and Full, reset all add-on quantities to the included amount and animate the price difference
  const handleContentEditingPackageToggle = (isFull) => {
    // Calculate previous total
    const prevTotal = getServiceTotal(
      SERVICES.find(s => s.key === 'content_editing'),
      { ...addOnState.content_editing, full: !isFull },
      0
    );
    // Set new included quantities
    const included = isFull
      ? { photo25: 0, photo100: 5, shortfilm: 1, vertical: 6, carousel: 2, branding: 1 }
      : { photo25: 0, photo100: 1, shortfilm: 0, vertical: 2, carousel: 1, branding: 0 }
      setContentEditingAlaCarte(included);
    setAddOnState((prev) => ({
      ...prev,
      content_editing: {
        ...prev.content_editing,
        full: isFull,
        addOns: Object.fromEntries(contentEditingFullItems.map((a) => [a.key, isFull]))
      }
    }));
    setContentEditingBasicOn(!isFull);
    // Calculate new total
    const newTotal = getServiceTotal(
      SERVICES.find(s => s.key === 'content_editing'),
      { ...addOnState.content_editing, full: isFull },
      0
    );
    showAnim(newTotal - prevTotal);
  };

  const finalTotal = total - multiItemDiscount;

  // 2. Helper for animated price change for booth add-ons
  function handleBoothAddOnToggle(booth, addOnKey, price, perHour = true) {
    setBoothState(prev => {
      const checked = booth === 'photo' ? prev.photoAddOns[addOnKey] : booth === 'video' ? prev.videoAddOns[addOnKey] : prev.phoneAddOns[addOnKey];
      const newChecked = !checked;
      const delta = (newChecked ? 1 : -1) * price * (perHour ? 3 : 1); // use 3hr event-time
      showAnim(delta);
      if (booth === 'photo') {
        return { ...prev, photoAddOns: { ...prev.photoAddOns, [addOnKey]: newChecked } };
      } else if (booth === 'video') {
        return { ...prev, videoAddOns: { ...prev.videoAddOns, [addOnKey]: newChecked } };
      } else {
        return { ...prev, phoneAddOns: { ...prev.phoneAddOns, [addOnKey]: newChecked } };
      }
    });
  }

  // Refactor handleMainBoothToggle to update both boothState and selected together
  function handleMainBoothToggle(boothKey) {
    setBoothState(prev => {
      const newState = { ...prev, [boothKey]: !prev[boothKey] };
      // If turning off phone, also close its add-ons
      if (boothKey === 'phone' && prev.phone) {
        newState.showPhoneAddOns = false;
      }
      // If turning off video, also turn off phone
      if (boothKey === 'video' && prev.video && prev.phone) {
        newState.phone = false;
        newState.showPhoneAddOns = false;
      }
      // If turning off photo, also close its add-ons
      if (boothKey === 'photo' && prev.photo) {
        newState.showPhotoAddOns = false;
      }
      // If turning off video, also close its add-ons
      if (boothKey === 'video' && prev.video) {
        newState.showVideoAddOns = false;
      }
      // Always keep 'booths' in selected if any booth is on
      const anyOn = newState.photo || newState.video || newState.phone;
      setSelected(sel => {
        if (anyOn && !sel.includes('booths')) {
          return [...sel, 'booths'];
        } else if (!anyOn && sel.includes('booths')) {
          return sel.filter(k => k !== 'booths');
        }
        return sel;
      });
      // Animate price
      const prevTotal = getServiceTotal(SERVICES.find(s => s.key === 'booths'), prev);
      const newTotal = getServiceTotal(SERVICES.find(s => s.key === 'booths'), newState);
      showAnim(newTotal - prevTotal);
      return newState;
    });
  }

  // Remove entire service with animated price delta
  function handleRemoveService(serviceKey) {
    const service = SERVICES.find((s) => s.key === serviceKey);
    if (!service) return;
    let removeAmount = 0;
    if (serviceKey === 'camera_rentals') {
      const result = getServiceTotal(service, addOnState.camera_rentals, 0);
      removeAmount = typeof result === 'number' ? result : (result?.total || 0);
      setCameraRentalDigitalOn(true);
      setCameraRentalPrintOn(false);
      setCameraRentalAlaCarte({ bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0, qr_codes: 0 });
      setAddOnState((prev) => {
        const next = { ...prev };
        delete next.camera_rentals;
        return next;
      });
    } else if (serviceKey === 'booths') {
      removeAmount = getServiceTotal(service, boothState) || 0;
      setBoothState({ ...defaultBoothState });
    } else if (serviceKey === 'content_editing') {
      const result = getServiceTotal(service, addOnState.content_editing, 0);
      removeAmount = typeof result === 'number' ? result : (result?.total || 0);
      setAddOnState((prev) => {
        const next = { ...prev };
        delete next.content_editing;
        return next;
      });
    } else {
      const result = getServiceTotal(service, addOnState[serviceKey]?.addOns);
      removeAmount = typeof result === 'number' ? result : (result?.total || 0);
      setAddOnState((prev) => {
        const next = { ...prev };
        delete next[serviceKey];
        return next;
      });
    }
    showAnim(-removeAmount);
    setSelected((prev) => prev.filter((k) => k !== serviceKey));
  }

  return (
    <section className="business-offerings-flex" style={{ width: '100%', padding: '2rem 0', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', minHeight: '60vh' }}>
      {/* Buttons grid wrapper for mobile layout */}
      <div className="offerings-buttons-grid">
        <div className="main-grid" style={{ width: '100%', justifyContent: 'start', padding: 0, background: 'none', minHeight: 0 }}>
          <div className="small-buttons-row">
            <ServiceButton service={SERVICES[2]} selected={selected.includes(SERVICES[2].key)} onToggle={handleToggle} onHover={setHovered} hover={hovered === SERVICES[2].key} />
            <ServiceButton service={SERVICES[1]} selected={selected.includes(SERVICES[1].key)} onToggle={handleToggle} onHover={setHovered} hover={hovered === SERVICES[1].key} />
          </div>
          <div className="small-buttons-row">
            <ServiceButton service={SERVICES[0]} selected={selected.includes(SERVICES[0].key)} onToggle={handleToggle} onHover={setHovered} hover={hovered === SERVICES[0].key} />
            <ServiceButton service={SERVICES[3]} selected={selected.includes(SERVICES[3].key)} onToggle={handleToggle} onHover={setHovered} hover={hovered === SERVICES[3].key} />
          </div>
        </div>
      </div>
      {/* Your Package Sidebar below the buttons */}
      <aside className="your-package-sidebar" style={{ flex: 1, minWidth: 320, maxWidth: 450, marginLeft: 48, background: 'rgba(255,255,255,0.95)', borderRadius: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'sticky', top: 32, height: 'fit-content' }}>
        <h2 style={{ fontWeight: 900, fontSize: '2rem', marginBottom: '0.5rem', color: '#222' }}>Your Package</h2>
        {selectedServices.length === 0 ? (
          <div style={{ color: '#666', fontSize: '1.1rem' }}>
            <em>Select services to build your package.</em>
          </div>
        ) : (
          <>
            <ul style={{ padding: 0, margin: 0, width: '100%' }}>
              {selectedServices.map((s) => (
                <li key={s.key} style={{ marginBottom: 18, listStyle: 'none', borderBottom: '1px solid #eee', paddingBottom: 12, position: 'relative' }}>
                  {/* Remove service button */}
                  <button
                    aria-label={`Remove ${s.title}`}
                    onClick={() => handleRemoveService(s.key)}
                    style={{ position: 'absolute', top: 0, right: 0, border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#E74C3C"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#222', paddingRight: 28 }}>{s.title}</div>
                  <div style={{ color: '#666', fontSize: 15, margin: '2px 0 6px 0' }}>{
                    s.key === 'camera_rentals' ? (
                      addOnState[s.key]?.full 
                        ? '*CLASSIC Package' 
                        : cameraRentalDigitalOn && cameraRentalPrintOn
                        ? 'Digital Package + Print Package'
                        : cameraRentalDigitalOn
                        ? 'Digital Package'
                        : cameraRentalPrintOn
                        ? 'Print Package'
                        : 'Select a package'
                    ) : s.priceLabel
                  }</div>
                  <div style={{ margin: '8px 0 0 0', position: 'relative', backgroundColor: s.key === 'camera_rentals' ? 'rgba(0,0,0,0.03)' : 'transparent', padding: s.key === 'camera_rentals' ? '12px' : '0', borderRadius: s.key === 'camera_rentals' ? '8px' : '0' }}>
                    {s.key === 'camera_rentals' ? (
                      <>
                        {/* Digital Package toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8, cursor: 'pointer' }} onClick={() => {
  // Calculate price difference directly
  const newDigitalState = !cameraRentalDigitalOn;
  const priceDelta = newDigitalState ? 1550 : -1550;
  
  // Show animation
  showAnim(priceDelta);
  
  // Toggle Digital Package
  setCameraRentalDigitalOn(newDigitalState);
  setAddOnState((prev) => ({
    ...prev,
    camera_rentals: {
      ...prev.camera_rentals,
      full: false,
      addOns: Object.fromEntries(cameraRentalFullItems.map((a) => [a.key, false]))
    }
  }));
}}>
  <ToggleCircle checked={cameraRentalDigitalOn} />
  <span style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>Digital Package</span>
  <span style={{ fontWeight: 600, fontSize: 15, color: '#27ae60', marginLeft: 8 }}>$2200</span>
</div>
{cameraRentalDigitalOn && (
  <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 15, marginBottom: 8 }}>
    {cameraRentalDigitalItems.map((a, i) => (
      <li key={i}>{a.label}</li>
    ))}
  </ul>
)}
{/* Print Package toggle */}
<div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8, cursor: 'pointer' }} onClick={() => {
  // Calculate price difference directly
  const newPrintState = !cameraRentalPrintOn;
  const priceDelta = newPrintState ? 2500 : -2500;
  
  // Show animation
  showAnim(priceDelta);
  
  // Toggle Print Package
  setCameraRentalPrintOn(newPrintState);
  setAddOnState((prev) => ({
    ...prev,
    camera_rentals: {
      ...prev.camera_rentals,
      full: false,
      addOns: Object.fromEntries(cameraRentalFullItems.map((a) => [a.key, false]))
    }
  }));
}}>
  <ToggleCircle checked={cameraRentalPrintOn} />
  <span style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>Print Package</span>
  <span style={{ fontWeight: 600, fontSize: 15, color: '#27ae60', marginLeft: 8 }}>$2500</span>
</div>
{cameraRentalPrintOn && (
  <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 15, marginBottom: 8 }}>
    {cameraRentalPrintItems.map((a, i) => (
      <li key={i}>{a.label}</li>
    ))}
  </ul>
)}
<div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8, cursor: 'pointer' }} onClick={() => {
  const service = SERVICES.find(s => s.key === 'camera_rentals');
  // Calculate previous total (before toggle)
  const prevTotal = getServiceTotal(service, addOnState.camera_rentals || { full: false }, 0);
  const prevTotalValue = typeof prevTotal === 'number' ? prevTotal : (prevTotal?.total || 0);
  
  // Toggle Full Package
  const newFullState = !addOnState.camera_rentals?.full;
  setCameraRentalDigitalOn(false);
  setCameraRentalPrintOn(false);
  setAddOnState((prev) => ({
    ...prev,
    camera_rentals: {
      ...prev.camera_rentals,
      full: newFullState,
      addOns: Object.fromEntries(cameraRentalFullItems.map((a) => [a.key, newFullState]))
    }
  }));
  
  // Set included add-ons when Full Package is toggled on
  if (newFullState) {
    setCameraRentalAlaCarte((prev) => ({
      ...prev,
      bar: cameraRentalFullIncluded.bar || 0,
      cam_tender: cameraRentalFullIncluded.cam_tender || 0,
      polaroid5: cameraRentalFullIncluded.polaroid5 || 0,
      film5: cameraRentalFullIncluded.film5 || 0,
      qr_codes: cameraRentalFullIncluded.qr_codes || 0,
    }));
  } else {
    setCameraRentalAlaCarte((prev) => ({
      ...prev,
      bar: 0,
      cam_tender: 0,
      polaroid5: 0,
      film5: 0,
      qr_codes: 0,
    }));
  }
  
  // Calculate new total (Full Package is $4500, or $0 if turning off)
  const newTotalValue = newFullState ? 4500 : 0;
  showAnim(newTotalValue - prevTotalValue);
}}>
  <ToggleCircle checked={addOnState.camera_rentals?.full} />
  <span style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>Full Package</span>
  <span style={{ fontWeight: 600, fontSize: 15, color: '#27ae60', marginLeft: 8 }}>$4500</span>
</div>
{addOnState.camera_rentals?.full && (
  <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 15, marginBottom: 8 }}>
    {cameraRentalFullItems.map((a) => (
      <li key={a.key}>{a.label}</li>
    ))}
  </ul>
)}
                        {/* A-La-Carte Section */}
                        <div style={{ fontWeight: 600, color: '#222', margin: '16px 0 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
  onClick={() => setShowAddOns(!showAddOns)}
  onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'rotate(90deg)'}
  onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = showAddOns ? 'rotate(90deg)' : 'rotate(0deg)'}
>
  Add-Ons:
  <span style={{
    transform: showAddOns ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s, color 0.3s',
    marginLeft: 8,
    color: showAddOns ? '#66C4CC' : '#222',
  }}>▶</span>
</div>
{showAddOns && cameraRentalAlaCarteItems.map((item) => {
  const includedQty = addOnState[s.key]?.full ? (cameraRentalFullIncluded[item.key] || 0) : 0;
  const qty = cameraRentalAlaCarte[item.key] || 0;
  const isIncluded = addOnState[s.key]?.full && includedQty > 0;
  return (
    <div key={item.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8 }}>
      <AlaCarteBubble
        quantity={qty || (isIncluded ? 1 : 0)}
        onAdd={() => handleCameraRentalAddOnChange(item.key, (qty || (isIncluded ? 1 : 0)) + 1)}
        onSubtract={() => handleCameraRentalAddOnChange(item.key, Math.max(isIncluded ? 1 : 0, (qty || (isIncluded ? 1 : 0)) - 1))}
      />
      <span style={{ fontSize: 15, color: '#222' }}>{item.label}</span>
      <span style={{ fontSize: 14, color: isIncluded ? '#aaa' : '#66C4CC', marginLeft: 6 }}>
        {item.price}{item.perHour ? '/hr' : ''}
        {isIncluded && qty <= includedQty && ' (included)'}
      </span>
      {isIncluded && qty > includedQty && (
        <span style={{ fontSize: 13, color: '#27ae60', marginLeft: 6 }}>
          +{qty - includedQty} extra
        </span>
      )}
    </div>
  );
})}
                        {/* Pricing reminder for Camera Catering */}
                        <div style={{ marginTop: 8 }}>
                          <span className="hiw-subtext" style={{ color: '#888', fontSize: 13 }}>
                            Pricing shown based on 4 hour event duration.
                          </span>
                        </div>
                        {/* Service Subtotal */}
                        <div style={{ 
                          position: 'absolute', 
                          bottom: 0, 
                          right: 0, 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '2px'
                        }}>
                          <div style={{ 
                            fontSize: 10, 
                            color: '#666',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            total
                          </div>
                          <div style={{ 
                            fontWeight: 600, 
                            fontSize: 16, 
                            color: '#27ae60',
                            background: 'rgba(255,255,255,0.9)',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid #e0e0e0'
                          }}>
                            ${(() => {
                              const service = SERVICES.find(serv => serv.key === 'camera_rentals');
                              const result = getServiceTotal(service, addOnState.camera_rentals, 0);
                              return typeof result === 'number' ? result : (result?.total || 0);
                            })().toLocaleString()}
                          </div>
                        </div>
                      </>
                    ) : s.key === 'booths' ? (
                      <>
                        {/* Booth toggles */}
                        <div style={{ fontWeight: 600, color: '#222', marginBottom: 4 }}>Select Booths:</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                          {/* Photo Booth Toggle */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => handleMainBoothToggle('photo')}>
                            <ToggleCircle checked={boothState.photo} />
                            <span style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>Photo Booth</span>
                            <span style={{ fontWeight: 600, fontSize: 15, color: '#27ae60', marginLeft: 8 }}>$350/hr (2hr min)</span>
                          </div>
                          {boothState.photo && (
                            <div style={{ marginLeft: 32, marginTop: -8, marginBottom: 8 }}>
                              {/* <div style={{ fontWeight: 600, color: '#222', marginBottom: 4 }}>Photo Booth Includes:</div> */}
                              <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 15 }}>
                                <li>Props, costumes, signs...</li>
                                <li>Unlimited Instant Prints</li>
                                <li>1x Dedicated Operator</li>
                                <li>Luxury Backdrop of your choice</li>
                                <li>Images available for instant download!</li>
                              </ul>
                              <div style={{ fontWeight: 600, color: '#222', margin: '8px 0 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setBoothState(prev => ({ ...prev, showPhotoAddOns: !prev.showPhotoAddOns }))}>
                                Add-Ons:
                                <span style={{ transform: boothState.showPhotoAddOns ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s, color 0.3s', marginLeft: 8, color: boothState.showPhotoAddOns ? '#66C4CC' : '#222' }}>▶</span>
                              </div>
                              {boothState.showPhotoAddOns && (
                                <>
                                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8 }}>
                                    <div style={{ cursor: 'pointer' }} onClick={() => handleBoothAddOnToggle('photo', 'photo_magnet_prints', 750, false)}>
                                      <ToggleCircle checked={boothState.photoAddOns.photo_magnet_prints} />
                                    </div>
                                    <span style={{ fontSize: 15, color: '#222' }}>Photo-Magnet Prints</span>
                                    <span style={{ fontSize: 14, color: '#66C4CC', marginLeft: 6 }}>$750</span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8 }}>
                                    <div style={{ cursor: 'pointer' }} onClick={() => handleBoothAddOnToggle('photo', 'rotary', 150)}>
                                      <ToggleCircle checked={boothState.photoAddOns.rotary} />
                                    </div>
                                    <span style={{ fontSize: 15, color: '#222' }}>Standalone Rotary phone</span>
                                    <span style={{ fontSize: 14, color: '#66C4CC', marginLeft: 6 }}>$150/hr</span>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                          {/* Video Booth Toggle */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => handleMainBoothToggle('video')}>
                            <ToggleCircle checked={boothState.video} />
                            <span style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>Video Booth</span>
                            <span style={{ fontWeight: 600, fontSize: 15, color: '#27ae60', marginLeft: 8 }}>$350/hr (2hr min)</span>
                          </div>
                          {boothState.video && (
                            <div style={{ marginLeft: 32, marginTop: -8, marginBottom: 8 }}>
                              {/* <div style={{ fontWeight: 600, color: '#222', marginBottom: 4 }}>Video Booth Includes:</div> */}
                              <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 15 }}>
                                <li>Confessional Video Booth</li>
                                <li>Filming 24/7 to capture all the confessionals</li>
                                <li>1x Dedicated Operator</li>
                                <li>2x Camera Angles</li>
                                <li>Private, freestanding "room", behind four walls/curtains</li>
                                <li>All video is edited to cut out dead space</li>
                              </ul>
                              <div style={{ fontWeight: 600, color: '#222', margin: '8px 0 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setBoothState(prev => ({ ...prev, showVideoAddOns: !prev.showVideoAddOns }))}>
                                Add-Ons:
                                <span style={{ transform: boothState.showVideoAddOns ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s, color 0.3s', marginLeft: 8, color: boothState.showVideoAddOns ? '#66C4CC' : '#222' }}>▶</span>
                              </div>
                              {boothState.showVideoAddOns && [
                                { key: 'instant_download', label: 'Instant Download', price: 540 },
                                { key: 'branded_microphones', label: 'Branded Microphones', price: 330 },
                                { key: 'rotary', label: 'Standalone Rotary phone', price: 150 },
                              ].map((item) => (
                                <div key={item.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8 }}>
                                  <div style={{ cursor: 'pointer' }} onClick={() => handleBoothAddOnToggle('video', item.key, item.price, item.key === 'rotary')}>
                                    <ToggleCircle checked={boothState.videoAddOns[item.key]} />
                                  </div>
                                  <span style={{ fontSize: 15, color: '#222' }}>{item.label}</span>
                                  <span style={{ fontSize: 14, color: '#66C4CC', marginLeft: 6 }}>{item.key === 'rotary' ? '$150/hr' : `$${item.price}`}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {/* Phone Booth Toggle (only enabled if Video Booth is on) */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: boothState.video ? 'pointer' : 'not-allowed', opacity: boothState.video ? 1 : 0.5 }} onClick={() => boothState.video && handleMainBoothToggle('phone')}>
                            <ToggleCircle checked={boothState.phone} />
                            <span style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>Phone Booth</span>
                            <span style={{ fontWeight: 600, fontSize: 15, color: '#27ae60', marginLeft: 8 }}>$400/hr (2hr min add-on)</span>
                          </div>
                          {boothState.phone && boothState.video && (
                            <div style={{ marginLeft: 32, marginTop: -8, marginBottom: 8 }}>
                              {/* <div style={{ fontWeight: 600, color: '#222', marginBottom: 4 }}>Phone Booth Includes:</div> */}
                              <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 15 }}>
                                <li>Phone Booth as the confessional booth</li>
                                <li>Three different camera angles</li>
                                <li>Ringing phone every 5 minutes</li>
                                <li>All audio is recorded</li>
                                <li>Edited and delivered as a film</li>
                              </ul>
                              <div style={{ fontWeight: 600, color: '#222', margin: '8px 0 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setBoothState(prev => ({ ...prev, showPhoneAddOns: !prev.showPhoneAddOns }))}>
                                Add-Ons:
                                <span style={{ transform: boothState.showPhoneAddOns ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s, color 0.3s', marginLeft: 8, color: boothState.showPhoneAddOns ? '#66C4CC' : '#222' }}>▶</span>
                              </div>
                              {boothState.showPhoneAddOns && [
                                { key: 'rotary', label: 'Standalone Rotary phone', price: 150 },
                                { key: 'second', label: 'Second phone booth', price: 600 },
                              ].map((item) => (
                                <div key={item.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8 }}>
                                  <div style={{ cursor: 'pointer' }} onClick={() => handleBoothAddOnToggle('phone', item.key, item.price, true)}>
                                    <ToggleCircle checked={boothState.phoneAddOns[item.key]} />
                                  </div>
                                  <span style={{ fontSize: 15, color: '#222' }}>{item.label}</span>
                                  <span style={{ fontSize: 14, color: '#66C4CC', marginLeft: 6 }}>${item.price}/hr</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Pricing reminder */}
                        <div style={{ marginTop: 8 }}>
                          <span className="hiw-subtext" style={{ color: '#888', fontSize: 13 }}>
                            Pricing shown based on 3 hour event duration.
                          </span>
                        </div>
                        {/* Service Subtotal */}
                        <div style={{ 
                          position: 'absolute', 
                          bottom: 0, 
                          right: 0, 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '2px'
                        }}>
                          <div style={{ 
                            fontSize: 10, 
                            color: '#666',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            total
                          </div>
                          <div style={{ 
                            fontWeight: 600, 
                            fontSize: 16, 
                            color: '#27ae60',
                            background: 'rgba(255,255,255,0.9)',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid #e0e0e0'
                          }}>
                            ${getServiceTotal(SERVICES.find(serv => serv.key === 'booths'), boothState).toLocaleString()}
                          </div>
                        </div>
                      </>
                    ) : s.key === 'photo_video' ? (
                      <>
                        {/* Note about coverage and hourly logic */}
                        <div style={{ color: '#888', fontSize: 13, margin: '8px 0 12px 0' }}>
                          Pricing reflects up to 8 hours of coverageand and is subject to change based on the event type (Weddings and other large-scale events).
                        </div>
                        {/* Full Package toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8, cursor: 'pointer' }} onClick={() => handleFullToggle(s.key)}>
                          {addOnState[s.key]?.full ? (
                            <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="#66C4CC" stroke="#fff" strokeWidth="2"/><path d="M6 12l3 3 6-6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          ) : (
                            <span style={{ width: 22, height: 22, display: 'inline-block', border: '2px solid #aaa', borderRadius: '50%' }} />
                          )}
                          <span style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>Full Package</span>
                        </div>
                        {/* Photographer and Videographer toggles (always on, disabled) */}
                        {['photographer', 'videographer', 'raw'].map((key) => (
  key === 'raw' ? (
    <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8, opacity: 1, cursor: 'default' }}>
      <ToggleCircle checked={true} />
      <span style={{ fontSize: 15, color: '#222' }}>All Raw Footage and Photos</span>
      <span style={{ fontSize: 14, color: '#66C4CC', marginLeft: 6 }}>$1050</span>
    </div>
  ) : (
    <div
      key={key}
      style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8, cursor: addOnState[s.key]?.full ? 'not-allowed' : 'pointer', opacity: 1 }}
      onClick={() => {
        if (!addOnState[s.key]?.full) handleAddOnToggle(s.key, key);
      }}
    >
      <ToggleCircle checked={addOnState[s.key]?.full || addOnState[s.key]?.addOns[key]} />
      <span style={{ fontSize: 15, color: '#222' }}>{key === 'photographer' ? 'Photographer' : 'Videographer'}</span>
      <span style={{ fontSize: 14, color: '#66C4CC', marginLeft: 6 }}>$300/hr</span>
    </div>
  )
))}
                        {/* Other add-ons below as needed */}
                        {s.addOns.filter(a => !['photographer', 'videographer', 'raw'].includes(a.key)).map((a) => (
                          <AddOnToggle
                            key={a.key}
                            label={a.label}
                            checked={!!addOnState[s.key]?.addOns[a.key]}
                            onToggle={() => handleAddOnToggle(s.key, a.key)}
                            price={a.price}
                            included={a.included}
                            perHour={a.perHour}
                          />
                        ))}
                        {/* Pricing reminder for Photography + Videography */}
                        <div style={{ marginTop: 8 }}>
                          <span className="hiw-subtext" style={{ color: '#888', fontSize: 13 }}>
                            Pricing shown based on 4 hour event duration.
                          </span>
                        </div>
                        {/* Service Subtotal */}
                        <div style={{ 
                          position: 'absolute', 
                          bottom: 0, 
                          right: 0, 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '2px'
                        }}>
                          <div style={{ 
                            fontSize: 10, 
                            color: '#666',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            total
                          </div>
                          <div style={{ 
                            fontWeight: 600, 
                            fontSize: 16, 
                            color: '#27ae60',
                            background: 'rgba(255,255,255,0.9)',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid #e0e0e0'
                          }}>
                            ${addOnState[s.key]?.full ? 6450 : getServiceTotal(SERVICES.find(serv => serv.key === 'photo_video'), addOnState[s.key]?.addOns).toLocaleString()}
                          </div>
                        </div>
                      </>
                    ) : s.key === 'content_editing' ? (
                      <>
                        <div style={{ color: '#888', fontSize: 13, margin: '8px 0 12px 0' }}>
                          Offers premium content editing from the photo/video captured above AS WELL AS editing for other photo/video content captured by other vendors.
                        </div>
                        {/* Basic/Full Package toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8, cursor: 'pointer' }} onClick={() => handleContentEditingPackageToggle(false)}>
                          <ToggleCircle checked={contentEditingBasicOn} />
                          <span style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>Basic Package</span>
                          <span style={{ fontWeight: 600, fontSize: 15, color: '#27ae60', marginLeft: 8 }}>$1500</span>
                        </div>
                        {contentEditingBasicOn && (
                          <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 15, marginBottom: 8 }}>
                            {contentEditingBasicItems.map((a) => (
                              <li key={a.key}>{a.label}</li>
                            ))}
                          </ul>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8, cursor: 'pointer' }} onClick={() => handleContentEditingPackageToggle(true)}>
                          <ToggleCircle checked={!contentEditingBasicOn} />
                          <span style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>Full Editing Package</span>
                          <span style={{ fontWeight: 600, fontSize: 15, color: '#27ae60', marginLeft: 8 }}>$4500</span>
                        </div>
                        {!contentEditingBasicOn && (
                          <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 15, marginBottom: 8 }}>
                            {contentEditingFullItems.map((a) => (
                              <li key={a.key}>{a.label}</li>
                            ))}
                          </ul>
                        )}
                        {/* Add-Ons Section with animated arrow */}
                        <div style={{ fontWeight: 600, color: '#222', margin: '16px 0 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          onClick={() => setShowContentEditingAddOns(!showContentEditingAddOns)}
                          onMouseEnter={e => e.currentTarget.querySelector('span').style.transform = 'rotate(90deg)'}
                          onMouseLeave={e => e.currentTarget.querySelector('span').style.transform = showContentEditingAddOns ? 'rotate(90deg)' : 'rotate(0deg)'}
                        >
                          Add-Ons:
                          <span style={{
                            transform: showContentEditingAddOns ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s, color 0.3s',
                            marginLeft: 8,
                            color: showContentEditingAddOns ? '#66C4CC' : '#222',
                          }}>▶</span>
                        </div>
                        {showContentEditingAddOns && contentEditingAlaCarteItems.map((item) => {
                          const includedQty = contentEditingIncluded[item.key] || 0;
                          const qty = contentEditingAlaCarte[item.key] || 0;
                          return (
                            <div key={item.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8 }}>
                              <AlaCarteBubble
                                quantity={qty || includedQty}
                                onAdd={() => setContentEditingAlaCarte((prev) => ({ ...prev, [item.key]: (qty || includedQty) + 1 }))}
                                onSubtract={() => setContentEditingAlaCarte((prev) => ({ ...prev, [item.key]: Math.max(includedQty, (qty || includedQty) - 1) }))}
                              />
                              <span style={{ fontSize: 15, color: '#222' }}>{item.label}</span>
                              <span style={{ fontSize: 14, color: includedQty > 0 ? '#aaa' : '#66C4CC', marginLeft: 6 }}>
                                {item.price}
                                {includedQty > 0 && (qty <= includedQty)
                                  ? ' (included)'
                                  : item.price ? (qty > includedQty ? `/ +${qty - includedQty} extra` : '') : ''}
                              </span>
                            </div>
                          );
                        })}
                        {/* Service Subtotal */}
                        <div style={{ 
                          position: 'absolute', 
                          bottom: 0, 
                          right: 0, 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '2px'
                        }}>
                          <div style={{ 
                            fontSize: 10, 
                            color: '#666',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            total
                          </div>
                          <div style={{ 
                            fontWeight: 600, 
                            fontSize: 16, 
                            color: '#27ae60',
                            background: 'rgba(255,255,255,0.9)',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid #e0e0e0'
                          }}>
                            ${(() => {
                              const service = SERVICES.find(serv => serv.key === 'content_editing');
                              const result = getServiceTotal(service, addOnState.content_editing, 0);
                              return typeof result === 'number' ? result : (result?.total || 0);
                            })().toLocaleString()}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            {/* 1. Always render Content Editing Full Package discount next to its subtotal */}
            {/* {addOnState['content_editing']?.full && (
              <div style={{ fontWeight: 400, fontSize: 14, color: '#888', marginTop: 4 }}>
                Subtotal: ${subtotal.toLocaleString()}
                <span style={{ color: '#27ae60' }}> - ${contentEditingDiscount.toLocaleString()} (Full Package Discount)</span>
              </div>
            )} */}
            {/* Ensure the total is displayed first */}
            <div style={{ marginTop: 24, fontWeight: 900, fontSize: 22, color: '#222', position: 'relative', minHeight: 40 }}>
              Total: ${finalTotal.toLocaleString()}
              {anim && (
                <span className="price-anim" style={{
                  position: 'absolute',
                  right: 0,
                  top: -30,
                  fontWeight: 700,
                  fontSize: 22,
                  color: anim.color,
                  pointerEvents: 'none',
                  zIndex: 100,
                }}>
                  {anim.sign}${Math.abs(anim.delta).toLocaleString()}
                </span>
              )}
            </div>
            {/* Move the subtotal and discounts below the total */}
            <div style={{ fontWeight: 400, fontSize: 14, color: '#888', marginTop: 4 }}>
              Subtotal: ${subtotal.toLocaleString()}
              {contentEditingDiscount > 0 && (
                <span style={{ color: '#27ae60' }}> - ${contentEditingDiscount.toLocaleString()} (Full Package Discount)</span>
              )}
              {photoVideoDiscount > 0 && (
                <span style={{ color: '#27ae60' }}> - ${photoVideoDiscount.toLocaleString()} (Full Package Discount)</span>
              )}
              {fullPackageSavings > 0 && (
                <span style={{ color: '#27ae60' }}> - ${fullPackageSavings.toLocaleString()} (Full Package Savings)</span>
              )}
              {multiItemDiscount > 0 && (
                <span style={{ color: '#27ae60' }}> - ${multiItemDiscount.toLocaleString()} (5% off for 2+ items)</span>
              )}
            </div>
            {/* Disclaimer text and consultation button beneath subtotal */}
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ color: '#888', fontSize: 13, fontStyle: 'italic', flex: 1 }}>
                Total Pricing is only an estimation. Please schedule a call for more information + booking.
              </div>
              <PopupButton
                id="wwvkhbUP"
                size={80}
                className="consultation-button"
                style={{
                  backgroundColor: 'var(--welcome-button-bg)',
                  color: 'var(--welcome-button-text)',
                  border: '4px solid var(--welcome-button-border)',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 100ms ease-in-out 100ms',
                  alignSelf: 'stretch',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  willChange: 'transform',
                }}
              >
                Schedule Consultation
              </PopupButton>
            </div>
          </>
        )}
      </aside>
      <style jsx>{`
        .price-anim {
          animation: priceFadeMove 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes priceFadeMove {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          15% {
            opacity: 1;
            transform: translateY(0);
          }
          85% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(18px);
          }
        }
        .animate-toggle {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform: scale(1.1);
          opacity: 0.8;
        }
        .business-offerings-flex {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          min-height: 60vh;
          width: 100%;
        }
        @media (max-width: 720px) {
          .business-offerings-flex {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            width: 100vw !important;
            padding: 0 !important;
          }
          .hiw-container {
            width: 140px !important;
            height: 140px !important;
            aspect-ratio: 1 / 1 !important;
            margin: 8px 0 !important;
            padding: 0 !important;
            min-height: 0 !important;
            display: flex !important;
            align-items: stretch !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          .hiw-card {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            background: none !important;
          }
          .hiw-card > * {
            margin: 0 !important;
            padding: 0 !important;
          }
          .small-buttons-row {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 8px !important;
            width: 100vw !important;
            margin: 0 auto 0 auto !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          /* Remove margin-left override for .small-buttons-row:last-child */
          .your-package-sidebar {
            order: 2 !important;
            width: 95vw !important;
            max-width: 500px !important;
            min-width: 0 !important;
            align-items: center !important;
            position: static !important;
            padding: 1rem !important;
            margin: 24px 0 24px 0 !important;
            box-shadow: 0 2px 16px rgba(0,0,0,0.08) !important;
          }
          .main-grid {
            width: 100vw !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          /* Hide descriptions, show only price on mobile */
          .hiw-card h6,
          .hiw-card .hiw-subtext:not(:last-child) {
            display: none !important;
          }
          .hiw-card .hiw-subtext:last-child {
            display: block !important;
            font-size: clamp(10px, 2vw, 13px) !important;
            font-weight: 700 !important;
            color: #FFE066 !important;
            margin: 0 auto !important;
            text-align: center !important;
          }
        }
        @media (max-width: 450px) {
          .hiw-container {
            width: 100px !important;
            height: 100px !important;
            aspect-ratio: 1 / 1 !important;
            margin: 8px 0 !important;
            padding: 0 !important;
            min-height: 0 !important;
            display: flex !important;
            align-items: stretch !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          .hiw-card {
            width: 100% !important;
            height: 100% !important;
            font-size: 10.8px !important;
            padding: 0 !important;
            margin: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            background: none !important;
          }
          .hiw-card > * {
            margin: 0 !important;
            padding: 0 !important;
          }
          .hiw-card .hiw-subtext:last-child {
            font-size: 90% !important;
          }
          .small-buttons-row {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          /* Remove margin-left override for .small-buttons-row:last-child */
        }
        @media (max-width: 600px) {
          .your-package-sidebar {
            padding: 1.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .your-package-sidebar {
            padding: 1rem !important;
          }
        }
        :global(.consultation-button:hover),
        :global(.consultation-button .tf-v1-widget-button:hover) {
          background-color: var(--welcome-button-hover-bg) !important;
          color: var(--welcome-button-hover-text) !important;
          border-color: var(--welcome-button-hover-border) !important;
          transform: scale(1.1) rotate(-6deg);
        }
      `}</style>
    </section>
  );
}
