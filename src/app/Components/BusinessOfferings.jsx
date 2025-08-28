import React, { useState, useRef, useEffect } from 'react';
import '../Components2/MainGrid.css';
import '../Components2/HowItWorksButton.css';
import '../Components2/PrintPackButton.css';

const EVENT_HOURS = 4; // Default event duration for calculations

const SERVICES = [
    {
    key: 'photo_video',
      title: 'Photography + Videography',
    description: 'High-quality & vintage styles. 400+ edited photos, highlight reel, short film.',
    price: 6450,
    addOns: [
      { key: 'photos', label: '400+ edited photos (digital + vintage)', price: 1800 },
      { key: 'highlight', label: 'Highlight reel (3-5 min)', price: 1800 },
      { key: 'shortfilm', label: 'Short film (10-15 min)', price: 1800 },
      { key: 'raw', label: 'All raw footage delivered', price: 1050 },
    ],
    priceLabel: 'Starts at $3050',
  },
  {
    key: 'photo_booth',
      title: 'Photo Booths',
    description: 'Props, costumes, instant prints, AI-edited images.',
    price: 350 * 2, // 2 hour minimum
    addOns: [
      { key: 'props', label: 'Props & costumes', price: 350 },
      { key: 'prints', label: 'Instant prints', price: 350 },
      { key: 'backdrop', label: 'Custom backdrop design', price: 350 },
      { key: 'ai', label: 'AI-edited images on the spot', price: 350 },
    ],
    priceLabel: '$350/hr – 2 hour minimum',
  },
  {
    key: 'video_booth',
      title: 'Video Booths',
    description: 'Confessional booth, edited videos, 3-min highlight reel.',
    price: 350 * 2, // 2 hour minimum
    addOns: [
      { key: 'confessional', label: 'Private confessional booth', price: 350 },
      { key: 'edited', label: 'Edited videos (no dead space)', price: 350 },
      { key: 'highlight', label: '3-minute highlight reel', price: 350 },
    ],
    priceLabel: '$350/hr – 2 hour minimum',
  },
  {
    key: 'camera_rentals',
      title: 'Camera Catering*',
    description: 'Our signature service. Ditch the disposable cameras, rent digicams and camcorders instead.',
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
      title: 'Content Editing',
    description: 'Premium editing for all captured and vendor content.',
    price: 4100,
    addOns: [
      { key: 'captured', label: 'All captured content edited', price: 2000 },
      { key: 'vendor', label: 'Other vendor content included', price: 1100 },
      { key: 'delivery', label: 'Full delivery of edited files', price: 1000 },
    ],
    priceLabel: 'Price starts at $2500',
    },
  {
    key: 'bundles',
    title: 'Bundles',
    description: 'Save more with curated packages.',
    price: 0,
    addOns: [
      { key: 'booth_bundle', label: 'Booth Bundle (Photo + Video Booths, 8% off)', bundleType: 'booth', discount: 0.08 },
      { key: 'full_service', label: 'Full-Service (All non-booth, 10% off)', bundleType: 'full', discount: 0.10 },
      { key: 'content_creator', label: 'Content Creator (Everything, 15% off)', bundleType: 'all', discount: 0.15 },
    ],
    priceLabel: 'See bundle options',
    isBundle: true,
    },
  ];

  const bundles = [
    'Book both booths together and save $100/hr',
    'Add content editing to your full coverage and get a $500 discount',
    'Camera rentals + booth + pro coverage = total guest POV + cinematic output',
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
        <span className="hiw-subtext" style={{ fontWeight: 700, color: 'var(--button-yellow-bg, #FFE066)', fontSize: 16 }}>{service.priceLabel}</span>
      </div>
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
  const [selected, setSelected] = useState([]); // [serviceKey]
  const [hovered, setHovered] = useState(null); // serviceKey
  const [addOnState, setAddOnState] = useState({}); // { serviceKey: { full: true, addOns: { addOnKey: true/false } } }
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
    { key: 'verticals', label: '2 Vertical Videos' },
    { key: 'carousels', label: '1 Carousel' },
    { key: 'photos', label: '150 Edited Photos' },
  ];
  const contentEditingFullItems = [
    { key: 'verticals', label: '3 Vertical Videos (15-60 Seconds)' },
    { key: 'carousels', label: '2 Viral Carousel Posts (6-12 Slides)' },
    { key: 'shortfilm', label: '2-5 minute “Short Film” (Horizontal)' },
    { key: 'photos', label: '100x Edited Photos' },
    { key: 'branding', label: 'Custom Partial-Branding' },
  ];

  // Content Editing a-la-carte items
  const contentEditingAlaCarteItems = [
    { key: 'photo25', label: '25x Photo Edits', price: 200 },
    { key: 'photo100', label: '100x Photo Edits', price: 650 },
    { key: 'shortfilm', label: 'Short Film/Recap Video (2-5 Minutes)', price: 1250 },
    { key: 'vertical', label: 'Vertical Video Reel/TikTok (15-60 Seconds)', price: 350 },
    { key: 'carousel', label: 'Carousel Post (6-12 Slides)', price: 350 },
    { key: 'branding', label: 'Custom Branding', price: 1100 },
  ];

  // Camera Rental full package items
  const cameraRentalFullItems = [
    { key: 'cameras25', label: '25 Total Cameras' },
    { key: 'polaroid5', label: '5x Polaroid Cameras' },
    { key: 'film5', label: '5x Film Cameras' },
    { key: 'bar', label: 'The Camera Bar' },
    { key: 'cam_tender', label: '1 Cam-Tender' },
    { key: 'photos500', label: '500 Edited photos.' },
    { key: 'vintage', label: '“Home-Video" Recap”' },
    { key: 'recap', label: '"Photo-Dump" Video' },
    { key: 'delivery72', label: '72 Hour Delivery' },
  ];
  // Camera Rental basic package items
  const cameraRentalBasicItems = [
    { label: '15 Cameras.' },
    { label: '250 Edited photos.' },
    { label: '"Home-Video" Recap' },
    { label: '"Photo-Dump" Recap' },
    { label: 'All Raw Video + Photos' },
    { label: '36 Hour Delivery' },
  ];
  // Camera Rental full package included quantities
  const cameraRentalFullIncluded = {
    bar: 1, // Camera Bar for 4 hours
    cam_tender: 1, // 1 Cam-Tender included in full package
    polaroid5: 1, // 5x Polaroid Cameras for 4 hours
    film5: 1, // 5x Film Cameras for 4 hours
    cameras5: 0, // Not included in full package
    cameras3: 0, // Not included in full package
    weekend: 0, // Not included in full package
  };
  // Update cameraRentalAlaCarteItems to separate Camera Bar and Cam-Tender, and allow multiple Cam-Tenders
  const cameraRentalAlaCarteItems = [
    { key: 'bar', label: 'The Camera Bar', price: 500, perHour: true },
    { key: 'cam_tender', label: 'Cam-Tender', price: 200, perHour: true },
    { key: 'polaroid5', label: '+5 Polaroid Cams', price: 350, perHour: true },
    { key: 'film5', label: '+5 Film Cams', price: 350, perHour: true },
    { key: 'cameras5', label: '+5 Digicams', price: 150, perHour: true },
    { key: 'cameras3', label: '+3 Camcorders', price: 180, perHour: true },
    { key: 'weekend', label: 'Weekend Rental (3-Days)', price: 2050, perHour: false },
  ];
  const CAMERA_RENTAL_HOURS = 4;
  const [cameraRentalAlaCarte, setCameraRentalAlaCarte] = useState({
    bar: 0,
    cam_tender: 0,
    polaroid5: 0,
    film5: 0,
    cameras5: 0,
  });
  // Add state for cameraRentalBasicOn
  const [cameraRentalBasicOn, setCameraRentalBasicOn] = useState(true);

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

  // --- Fix for 2 & 3: Always reset add-ons to 0 when toggling to Basic, and always animate the full price difference including add-ons when switching between Full and Basic ---
  const handleCameraRentalPackageToggle = (isFull) => {
    // Calculate previous total (with current add-ons)
    const prevTotal = getServiceTotal(
      SERVICES.find(s => s.key === 'camera_rentals'),
      { ...addOnState.camera_rentals, full: cameraRentalBasicOn ? false : true },
      0
    ).total + Object.entries(cameraRentalAlaCarte).reduce((sum, [key, qty]) => {
      const item = cameraRentalAlaCarteItems.find(i => i.key === key);
      return sum + (qty * item.price * (item.perHour ? CAMERA_RENTAL_HOURS : 1));
    }, 0);

    // Set new add-on state
    let newAlaCarte = isFull ? cameraRentalAlaCarte : { bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0 };
    if (!isFull) {
      newAlaCarte = { bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0 };
      setCameraRentalBasicOn(true); // Reset to basic package
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
    setCameraRentalAlaCarte({ bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0 });
    if (!isSelected) {
      setCameraRentalBasicOn(true); // Ensure Basic Package is selected by default
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
          setCameraRentalBasicOn(true); // Reset to Basic Package
          setCameraRentalAlaCarte({ bar: 0, cam_tender: 0, polaroid5: 0, film5: 0, cameras5: 0 });
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
    if (!addOnsOverride) return Math.round(service.price * (1 - bundleDiscount));
    if (service.addOns && service.addOns.every((a) => addOnsOverride[a.key])) return Math.round(service.price * (1 - bundleDiscount));
    if (service.key === 'camera_rentals') {
      let total = 0;
      let subtotal = 0;
      // Basic package is always $2500 if basic is ON
      if (cameraRentalBasicOn && !addOnsOverride.full) {
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
    if (service.key === 'photo_booth') {
      let total = 350 * 3;
      if (photoBoothAddOnsState.photo_magnet_prints) total += 750;
      return total;
    }
    if (service.key === 'video_booth') {
      let total = 350 * 3;
      if (videoBoothAddOnsState.instant_download) total += 540;
      if (videoBoothAddOnsState.branded_microphones) total += 330;
      return total;
    }
    if (service.key === 'photo_video') {
      // Photographer and Videographer are always required
      let total = 0;
      // Always 8 hours at $250/hr per person, $500/hr thereafter (no slider, just 8 hours)
      if (addOnsOverride['photographer']) {
        total += 8 * 250;
      }
      if (addOnsOverride['videographer']) {
        total += 8 * 250;
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
        ? { photo25: 0, photo100: 1, shortfilm: 1, vertical: 3, carousel: 2, branding: 1 }
        : { photo25: 0, photo100: 1, shortfilm: 0, vertical: 2, carousel: 1, branding: 0 };
      if (full) {
        total += 4100;
      } else {
        total += 1500;
      }
      // Only charge for add-ons above included
      total += Math.max(0, contentEditingAlaCarte.photo25 - (included.photo25 || 0)) * 200;
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
  const selectedServices = SERVICES.filter((s) => selected.includes(s.key));
  const serviceTotals = selectedServices.map((s) => {
    if (s.key === 'camera_rentals') {
      const { total: t, subtotal: st } = getServiceTotal(s, addOnState[s.key], 0);
      return { total: t, subtotal: st };
    }
    if (s.key === 'content_editing') {
      const isFull = addOnState[s.key]?.full;
      // Define included quantities and a-la-carte prices
      const included = isFull
        ? { photo25: 0, photo100: 1, shortfilm: 1, vertical: 3, carousel: 2, branding: 1 }
        : { photo25: 0, photo100: 1, shortfilm: 0, vertical: 2, carousel: 1, branding: 0 };
      const prices = { photo25: 200, photo100: 650, shortfilm: 1250, vertical: 350, carousel: 350, branding: 1100 };
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
        discount = subtotal > 4100 ? subtotal - 4100 : 0;
        let extras = 0;
        Object.keys(contentEditingAlaCarte).forEach(key => {
          extras += Math.max(0, contentEditingAlaCarte[key] - (included[key] || 0)) * prices[key];
        });
        total = 4100 + extras;
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
    return { total: getServiceTotal(s, addOnState[s.key]?.addOns), subtotal: getServiceTotal(s, addOnState[s.key]?.addOns) };
  });
  const subtotal = serviceTotals.reduce((sum, t) => sum + (t.subtotal || 0), 0);
  const total = serviceTotals.reduce((sum, t) => sum + (t.total || 0), 0);
  const contentEditingDiscount = serviceTotals.find(t => t.discount)?.discount || 0;
const discount = selectedServices.some(s => s.key === 'camera_rentals' && addOnState[s.key]?.full) ? subtotal - total : (selectedServices.length >= 2 ? Math.round(subtotal * 0.05) : 0);

// Update discount calculation to ensure both discounts are shown if applicable
const fullPackageSavings = selectedServices.some(s => s.key === 'camera_rentals' && addOnState[s.key]?.full) ? subtotal - total : 0;
const multiItemDiscount = selectedServices.length >= 2 ? Math.round(total * 0.05) : 0;

  // 1. Add state for opening/closing Content Editing add-on section
  const [showContentEditingAddOns, setShowContentEditingAddOns] = useState(false);

  // 2. Define included quantities for each package
  const contentEditingIncluded = contentEditingBasicOn
    ? { photo25: 0, photo100: 1, shortfilm: 0, vertical: 2, carousel: 1, branding: 0 }
    : { photo25: 0, photo100: 1, shortfilm: 1, vertical: 3, carousel: 2, branding: 1 };

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
      ? { photo25: 0, photo100: 1, shortfilm: 1, vertical: 3, carousel: 2, branding: 1 }
      : { photo25: 0, photo100: 1, shortfilm: 0, vertical: 2, carousel: 1, branding: 0 };
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

  return (
    <section className="business-offerings-flex" style={{ width: '100%', padding: '2rem 0', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', minHeight: '60vh' }}>
      {/* Buttons grid wrapper for mobile layout */}
      <div className="offerings-buttons-grid">
        <div className="main-grid" style={{ width: '100%', justifyContent: 'start', padding: 0, background: 'none', minHeight: 0 }}>
          <div className="small-buttons-row">
            <ServiceButton service={SERVICES[0]} selected={selected.includes(SERVICES[0].key)} onToggle={handleToggle} onHover={setHovered} hover={hovered === SERVICES[0].key} />
            <ServiceButton service={SERVICES[1]} selected={selected.includes(SERVICES[1].key)} onToggle={handleToggle} onHover={setHovered} hover={hovered === SERVICES[1].key} />
          </div>
          <div className="small-buttons-row">
            <ServiceButton service={SERVICES[2]} selected={selected.includes(SERVICES[2].key)} onToggle={handleToggle} onHover={setHovered} hover={hovered === SERVICES[2].key} />
            <ServiceButton service={SERVICES[3]} selected={selected.includes(SERVICES[3].key)} onToggle={handleToggle} onHover={setHovered} hover={hovered === SERVICES[3].key} />
          </div>
          <div className="small-buttons-row">
            <ServiceButton service={SERVICES[4]} selected={selected.includes(SERVICES[4].key)} onToggle={handleToggle} onHover={setHovered} hover={hovered === SERVICES[4].key} />
          </div>
        </div>
      </div>
      {/* Your Package Sidebar below the buttons */}
      <aside className="your-package-sidebar" style={{ flex: 1, minWidth: 320, maxWidth: 400, marginLeft: 48, background: 'rgba(255,255,255,0.95)', borderRadius: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'sticky', top: 32, height: 'fit-content' }}>
        <h2 style={{ fontWeight: 900, fontSize: '2rem', marginBottom: '0.5rem', color: '#222' }}>Your Package</h2>
        {selectedServices.length === 0 ? (
          <div style={{ color: '#666', fontSize: '1.1rem' }}>
            <em>Select services to build your package.</em>
          </div>
        ) : (
          <>
            <ul style={{ padding: 0, margin: 0, width: '100%' }}>
              {selectedServices.map((s) => (
                <li key={s.key} style={{ marginBottom: 18, listStyle: 'none', borderBottom: '1px solid #eee', paddingBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#222' }}>{s.title}</div>
                  <div style={{ color: '#666', fontSize: 15, margin: '2px 0 6px 0' }}>{
                    s.key === 'camera_rentals' ? (addOnState[s.key]?.full ? 'Full Package $4500' : 'Basic Package $2500') : s.priceLabel
                  }</div>
                  <div style={{ margin: '8px 0 0 0' }}>
                    {s.key === 'camera_rentals' ? (
                      <>
                        {/* Basic Package toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8, cursor: 'pointer' }} onClick={() => {
  setCameraRentalBasicOn(true);
  setAddOnState((prev) => ({
    ...prev,
    camera_rentals: {
      ...prev.camera_rentals,
      full: false,
      addOns: Object.fromEntries(cameraRentalFullItems.map((a) => [a.key, false]))
    }
  }));
}}>
  <ToggleCircle checked={cameraRentalBasicOn} />
  <span style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>Basic Package</span>
  <span style={{ fontWeight: 600, fontSize: 15, color: '#27ae60', marginLeft: 8 }}>$2500</span>
</div>
{cameraRentalBasicOn && (
  <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 15, marginBottom: 8 }}>
    {cameraRentalBasicItems.map((a, i) => (
      <li key={i}>{a.label}</li>
    ))}
  </ul>
)}
<div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8, cursor: 'pointer' }} onClick={() => {
  setCameraRentalBasicOn(false);
  setAddOnState((prev) => ({
    ...prev,
    camera_rentals: {
      ...prev.camera_rentals,
      full: true,
      addOns: Object.fromEntries(cameraRentalFullItems.map((a) => [a.key, true]))
    }
  }));
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
                      </>
                    ) : ['photo_booth', 'video_booth'].includes(s.key) ? (
                      <>
                        <div style={{ fontWeight: 600, color: '#222', marginBottom: 4 }}>Package Includes:</div>
                        <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 15 }}>
                          {s.addOns.map((a) => <li key={a.key}>{a.label}</li>)}
                        </ul>
                        <div style={{ color: '#888', fontSize: 13, marginTop: 6 }}>Total Pricing shown based on 3/hr event</div>
                        {/* Add-On Toggle Section */}
                        <div style={{ fontWeight: 600, color: '#222', margin: '16px 0 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          onClick={() => s.key === 'photo_booth' ? setShowPhotoAddOns(!showPhotoAddOns) : setShowVideoAddOns(!showVideoAddOns)}
                          onMouseEnter={(e) => e.currentTarget.querySelector('span').style.transform = 'rotate(90deg)'}
                          onMouseLeave={(e) => e.currentTarget.querySelector('span').style.transform = (s.key === 'photo_booth' ? showPhotoAddOns : showVideoAddOns) ? 'rotate(90deg)' : 'rotate(0deg)'}
                        >
                          Add-Ons:
                          <span style={{
                            transform: (s.key === 'photo_booth' ? showPhotoAddOns : showVideoAddOns) ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s, color 0.3s',
                            marginLeft: 8,
                            color: (s.key === 'photo_booth' ? showPhotoAddOns : showVideoAddOns) ? '#66C4CC' : '#222',
                          }}>▶</span>
                        </div>
                        {(s.key === 'photo_booth' ? showPhotoAddOns : showVideoAddOns) && (s.key === 'photo_booth' ? photoBoothAddOns : videoBoothAddOns).map((item) => (
                          <div key={item.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8 }}>
                            <div style={{ cursor: 'pointer' }} onClick={() => {
  const newState = s.key === 'photo_booth' ? { ...photoBoothAddOnsState, [item.key]: !photoBoothAddOnsState[item.key] } : { ...videoBoothAddOnsState, [item.key]: !videoBoothAddOnsState[item.key] };
  if (s.key === 'photo_booth') {
    setPhotoBoothAddOnsState(newState);
  } else {
    setVideoBoothAddOnsState(newState);
  }
  const priceChange = newState[item.key] ? item.price : -item.price;
  showAnim(priceChange);
}}>
  <ToggleCircle checked={s.key === 'photo_booth' ? photoBoothAddOnsState[item.key] : videoBoothAddOnsState[item.key]} />
</div>
                            <span style={{ fontSize: 15, color: '#222' }}>{item.label}</span>
                            <span style={{ fontSize: 14, color: '#66C4CC', marginLeft: 6 }}>${item.price}</span>
                          </div>
                        ))}
                      </>
                    ) : s.key === 'photo_video' ? (
                      <>
                        {/* Note about coverage and hourly logic */}
                        <div style={{ color: '#888', fontSize: 13, margin: '8px 0 12px 0' }}>
                          Entire Event Coverage (up to 8 hours at $250/hr per person, $500/hr thereafter)
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
      <span style={{ fontSize: 14, color: '#66C4CC', marginLeft: 6 }}>$250/hr</span>
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
                          <span style={{ fontWeight: 600, fontSize: 15, color: '#27ae60', marginLeft: 8 }}>$4100</span>
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
              {fullPackageSavings > 0 && (
                <span style={{ color: '#27ae60' }}> - ${fullPackageSavings.toLocaleString()} (Full Package Savings)</span>
              )}
              {multiItemDiscount > 0 && (
                <span style={{ color: '#27ae60' }}> - ${multiItemDiscount.toLocaleString()} (5% off for 2+ items)</span>
              )}
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
            display: flex !important;
            align-items: stretch !important;
            justify-content: center !important;
            padding: 0 !important;
          }
          .hiw-card {
            font-size: 12px;
            text-align: center;
            padding: 0 !important;
            height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
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
          .small-buttons-row:last-child {
            justify-content: flex-start !important;
            margin-left: calc(50vw - 140px - 4px) !important;
          }
          .your-package-sidebar {
            order: 2 !important;
            width: 95vw !important;
            max-width: 500px !important;
            min-width: 0 !important;
            align-items: center !important;
            position: static !important;
            padding: 1rem !important;
            margin: 24px 0 0 0 !important;
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
            display: flex !important;
            align-items: stretch !important;
            justify-content: center !important;
          }
          .hiw-card {
            font-size: 10.8px !important;
            padding: 0 !important;
            height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }
          .hiw-card .hiw-subtext:last-child {
            font-size: 90% !important;
          }
          .small-buttons-row {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .small-buttons-row:last-child {
            margin-left: calc(50vw - 100px - 4px) !important;
          }
        }
      `}</style>
    </section>
  );
}
