import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AvailabilityCalendarProps {
  icalUrl?: string;
}

interface BookedDate {
  start: Date;
  end: Date;
}

export function AvailabilityCalendar({ icalUrl }: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [loading, setLoading] = useState(false);

  // Parse iCal data
  const parseIcal = (icalData: string): BookedDate[] => {
    const events: BookedDate[] = [];
    const lines = icalData.split('\n');
    let currentEvent: { start?: Date; end?: Date } = {};

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('DTSTART')) {
        const dateStr = trimmedLine.split(':')[1]?.replace(/[^\d]/g, '');
        if (dateStr && dateStr.length >= 8) {
          const year = parseInt(dateStr.substring(0, 4));
          const month = parseInt(dateStr.substring(4, 6)) - 1;
          const day = parseInt(dateStr.substring(6, 8));
          currentEvent.start = new Date(year, month, day);
        }
      }
      
      if (trimmedLine.startsWith('DTEND')) {
        const dateStr = trimmedLine.split(':')[1]?.replace(/[^\d]/g, '');
        if (dateStr && dateStr.length >= 8) {
          const year = parseInt(dateStr.substring(0, 4));
          const month = parseInt(dateStr.substring(4, 6)) - 1;
          const day = parseInt(dateStr.substring(6, 8));
          currentEvent.end = new Date(year, month, day);
        }
      }
      
      if (trimmedLine === 'END:VEVENT' && currentEvent.start && currentEvent.end) {
        events.push({ start: currentEvent.start, end: currentEvent.end });
        currentEvent = {};
      }
    }

    return events;
  };

  // Fetch iCal data
  useEffect(() => {
    if (!icalUrl) {
      setLoading(false);
      return;
    }

    const fetchIcal = async () => {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
        console.log('iCal fetch timeout');
      }, 10000); // 10 second timeout

      try {
        // Try using a CORS proxy
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(icalUrl)}`;
        const controller = new AbortController();
        const timeoutId2 = setTimeout(() => controller.abort(), 8000); // 8 second fetch timeout
        
        const response = await fetch(proxyUrl, { 
          signal: controller.signal,
          headers: {
            'Accept': 'text/calendar,text/plain,*/*'
          }
        });
        
        clearTimeout(timeoutId2);
        
        if (response.ok) {
          const data = await response.text();
          if (data && data.trim()) {
            const parsed = parseIcal(data);
            setBookedDates(parsed);
          }
        }
      } catch (error) {
        console.log('Could not fetch iCal data:', error);
        // Silently fail - don't show error to user
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchIcal();
  }, [icalUrl]);

  // Check if a date is booked
  const isDateBooked = (date: Date): boolean => {
    return bookedDates.some(booking => {
      const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const startDate = new Date(booking.start.getFullYear(), booking.start.getMonth(), booking.start.getDate());
      const endDate = new Date(booking.end.getFullYear(), booking.end.getMonth(), booking.end.getDate());
      return checkDate >= startDate && checkDate < endDate;
    });
  };

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    // Convert to Monday = 0, Sunday = 6
    return day === 0 ? 6 : day - 1;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();
  const isToday = (day: number) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const isPast = (day: number) => {
    const checkDate = new Date(year, month, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return checkDate < todayStart;
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-8" />);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const booked = isDateBooked(date);
    const past = isPast(day);
    const todayClass = isToday(day);

    calendarDays.push(
      <div
        key={day}
        className={`
          h-8 flex items-center justify-center text-sm rounded-md transition-colors
          ${past ? 'text-gray-300' : ''}
          ${booked && !past ? 'bg-red-100 text-red-600' : ''}
          ${!booked && !past ? 'bg-green-50 text-green-700 hover:bg-green-100' : ''}
          ${todayClass ? 'ring-2 ring-primary-500 font-bold' : ''}
        `}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-800">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Calendar */}
      <div className="p-3">
        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="h-6 flex items-center justify-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-100 border border-green-300" />
            <span className="text-xs text-gray-600">Livre</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-100 border border-red-300" />
            <span className="text-xs text-gray-600">Ocupado</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
