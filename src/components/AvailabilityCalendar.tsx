import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AvailabilityCalendarProps {
  icalUrl?: string;
  minNights?: number;
  onDateSelection?: (startDate: string, endDate: string, isValid: boolean) => void;
}

interface BookedDate {
  start: Date;
  end: Date;
}

export function AvailabilityCalendar({ icalUrl, minNights = 1, onDateSelection }: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'info' | 'success'; text: string } | null>(null);

  // Parse iCal data
  const parseIcal = (icalData: string): BookedDate[] => {
    const events: BookedDate[] = [];
    const lines = icalData.split('\n');
    let currentEvent: { start?: Date; end?: Date } = {};

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('DTSTART:')) {
        const dateStr = trimmedLine.split(':')[1];
        if (dateStr && dateStr.length >= 8) {
          // Handle both YYYYMMDD and YYYYMMDDTHHMMSS formats
          const cleanDateStr = dateStr.replace(/T.*$/, ''); // Remove time part if present
          const year = parseInt(cleanDateStr.substring(0, 4));
          const month = parseInt(cleanDateStr.substring(4, 6)) - 1;
          const day = parseInt(cleanDateStr.substring(6, 8));
          
          if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            currentEvent.start = new Date(year, month, day);
          }
        }
      }
      
      if (trimmedLine.startsWith('DTEND:')) {
        const dateStr = trimmedLine.split(':')[1];
        if (dateStr && dateStr.length >= 8) {
          // Handle both YYYYMMDD and YYYYMMDDTHHMMSS formats
          const cleanDateStr = dateStr.replace(/T.*$/, ''); // Remove time part if present
          const year = parseInt(cleanDateStr.substring(0, 4));
          const month = parseInt(cleanDateStr.substring(4, 6)) - 1;
          const day = parseInt(cleanDateStr.substring(6, 8));
          
          if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            currentEvent.end = new Date(year, month, day);
          }
        }
      }
      
      if (trimmedLine === 'END:VEVENT' && currentEvent.start && currentEvent.end) {
        // Ensure end date is after start date
        if (currentEvent.end >= currentEvent.start) {
          events.push({ 
            start: new Date(currentEvent.start), 
            end: new Date(currentEvent.end) 
          });
        }
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
      
      // Timeout reduzido para melhor UX
      const timeoutId = setTimeout(() => {
        setLoading(false);
        console.log('iCal fetch timeout - usando modo livre');
        setBookedDates([]);
      }, 8000); // Reduzido para 8 segundos

      try {
        // Cache localStorage para evitar requests repetidos
        const cacheKey = `ical-${icalUrl}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(`${cacheKey}-time`);
        const now = Date.now();
        
        // Se cache existe e tem menos de 1 hora, usar cache
        if (cached && cacheTime && (now - parseInt(cacheTime)) < 3600000) {
          console.log('📋 Usando cache iCal');
          const parsed = parseIcal(cached);
          setBookedDates(parsed);
          setLoading(false);
          clearTimeout(timeoutId);
          return;
        }

        // Tentar proxy próprio primeiro (mais rápido)
        try {
          console.log('🚀 Tentando proxy rápido...');
          const controller = new AbortController();
          const proxyTimeout = setTimeout(() => controller.abort(), 5000); // 5 segundos
          
          const response = await fetch(`/api/proxy-ical?url=${encodeURIComponent(icalUrl)}`, { 
            signal: controller.signal,
            headers: {
              'Accept': 'text/calendar,text/plain,*/*'
            }
          });
          
          clearTimeout(proxyTimeout);
          
          if (response.ok) {
            const data = await response.text();
            if (data && data.trim() && (data.includes('BEGIN:VCALENDAR') || data.includes('DTSTART'))) {
              // Salvar no cache
              localStorage.setItem(cacheKey, data);
              localStorage.setItem(`${cacheKey}-time`, now.toString());
              
              const parsed = parseIcal(data);
              console.log('✅ iCal via proxy rápido:', parsed.length, 'datas');
              setBookedDates(parsed);
              setLoading(false);
              clearTimeout(timeoutId);
              return;
            }
          }
        } catch (proxyError) {
          console.log('Proxy rápido falhou, tentando outros...');
        }

        // Se proxy rápido falhar, tentar um proxy público apenas
        try {
          console.log('🔄 Tentando proxy público...');
          const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(icalUrl)}`, {
            headers: {
              'Accept': 'text/calendar,text/plain,*/*'
            }
          });
          
          if (response.ok) {
            const data = await response.text();
            if (data && data.trim() && (data.includes('BEGIN:VCALENDAR') || data.includes('DTSTART'))) {
              // Salvar no cache
              localStorage.setItem(cacheKey, data);
              localStorage.setItem(`${cacheKey}-time`, now.toString());
              
              const parsed = parseIcal(data);
              console.log('✅ iCal via proxy público:', parsed.length, 'datas');
              setBookedDates(parsed);
              setLoading(false);
              clearTimeout(timeoutId);
              return;
            }
          }
        } catch (publicError) {
          console.log('Proxy público falhou também');
        }

        // Se tudo falhar, usar modo livre
        console.log('⚠️ Todos os proxies falharam. Usando modo livre.');
        setBookedDates([]);
        
      } catch (error) {
        console.log('Erro geral iCal:', error);
        setBookedDates([]);
      } finally {
        setLoading(false);
        clearTimeout(timeoutId);
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
      // Include both start and end dates in the booking period
      return checkDate >= startDate && checkDate <= endDate;
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

  // Handle date selection
  const handleDateClick = (day: number) => {
    console.log('Calendar: Data clicada', { day, month, year, selectedStartDate, selectedEndDate });
    
    const clickedDate = new Date(year, month, day);
    
    // Limpar mensagem anterior
    setMessage(null);
    
    // Não permitir selecionar datas passadas
    if (isPast(day)) {
      setMessage({ type: 'error', text: 'Não é possível selecionar datas passadas.' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    
    // Não permitir selecionar datas ocupadas
    if (isDateBooked(clickedDate)) {
      setMessage({ type: 'error', text: 'Esta data está ocupada. Por favor, selecione outra data.' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    
    // Se já tiver seleção completa, começar nova seleção
    if (selectedStartDate && selectedEndDate) {
      console.log('Calendar: Iniciando nova seleção');
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
      setMessage({ type: 'info', text: `Check-in: ${clickedDate.getDate()}/${clickedDate.getMonth() + 1}. Selecione check-out.` });
      setTimeout(() => setMessage(null), 3000);
      if (onDateSelection) {
        onDateSelection('', '', false);
      }
      return;
    }
    
    if (!selectedStartDate) {
      // Selecionar data de check-in
      console.log('Calendar: Selecionando check-in');
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
      setMessage({ type: 'info', text: `Check-in: ${clickedDate.getDate()}/${clickedDate.getMonth() + 1}. Selecione check-out.` });
      setTimeout(() => setMessage(null), 3000);
      if (onDateSelection) {
        onDateSelection('', '', false);
      }
    } else if (!selectedEndDate) {
      // Verificar se está a clicar na mesma data do check-in
      if (clickedDate.getTime() === selectedStartDate.getTime()) {
        // Limpar seleção
        console.log('Calendar: Limpar seleção');
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setMessage({ type: 'info', text: 'Seleção limpa. Escolha novas datas.' });
        setTimeout(() => setMessage(null), 3000);
        if (onDateSelection) {
          onDateSelection('', '', false);
        }
        return;
      }
      
      // Verificar estadia mínima
      const nightsDiff = Math.ceil((clickedDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (nightsDiff < minNights) {
        setMessage({ type: 'error', text: `Estadia mínima de ${minNights} noite${minNights > 1 ? 's' : ''}.` });
        setTimeout(() => setMessage(null), 4000);
        return;
      }
      
      // Verificar datas ocupadas no período
      let hasBookedDates = false;
      for (let d = new Date(selectedStartDate); d < clickedDate; d.setDate(d.getDate() + 1)) {
        if (isDateBooked(d)) {
          hasBookedDates = true;
          break;
        }
      }
      
      if (hasBookedDates) {
        setMessage({ type: 'error', text: 'O período contém datas ocupadas.' });
        setTimeout(() => setMessage(null), 4000);
        return;
      }
      
      // Selecionar data de check-out
      console.log('Calendar: Selecionando check-out');
      setSelectedEndDate(clickedDate);
      setMessage({ 
        type: 'success', 
        text: `Período: ${nightsDiff} noite${nightsDiff > 1 ? 's' : ''}` 
      });
      setTimeout(() => setMessage(null), 5000);
      
      if (onDateSelection) {
        const startDateStr = selectedStartDate.toISOString().split('T')[0];
        const endDateStr = clickedDate.toISOString().split('T')[0];
        onDateSelection(startDateStr, endDateStr, true);
      }
    }
  };

  // Check if date is in selected range
  const isDateInSelectedRange = (day: number) => {
    const checkDate = new Date(year, month, day);
    if (!selectedStartDate || !selectedEndDate) return false;
    
    return checkDate >= selectedStartDate && checkDate <= selectedEndDate;
  };

  // Check if date is selected as start or end
  const isDateSelected = (day: number) => {
    const checkDate = new Date(year, month, day);
    return (selectedStartDate && checkDate.getTime() === selectedStartDate.getTime()) ||
           (selectedEndDate && checkDate.getTime() === selectedEndDate.getTime());
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
    const today = isToday(day);
    const selected = isDateSelected(day);
    const inRange = isDateInSelectedRange(day);
    const clickable = !past && !booked;

    calendarDays.push(
      <div
        key={day}
        onClick={() => handleDateClick(day)}
        className={`
          h-8 flex items-center justify-center text-sm rounded-md transition-colors cursor-pointer
          ${past ? 'text-gray-300 cursor-not-allowed' : ''}
          ${booked && !past ? 'bg-red-100 text-red-600 cursor-not-allowed' : ''}
          ${!booked && !past && !selected && !inRange ? 'bg-green-50 text-green-700 hover:bg-green-100' : ''}
          ${selected ? 'bg-primary-500 text-white font-bold shadow-lg transform scale-110' : ''}
          ${inRange && !selected ? 'bg-primary-100 text-primary-700' : ''}
          ${today && !selected ? 'ring-2 ring-primary-300 font-bold bg-primary-50' : ''}
        `}
        title={clickable ? 'Clique para selecionar datas' : booked ? 'Indisponível' : 'Data passada'}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-800">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Próximo mês"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Important Information */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 border-l-4 border-primary-500 px-3 py-2 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse shadow-lg" />
            <span className="text-xs font-medium text-primary-800">Selecione check-in e check-out</span>
          </div>
          {minNights > 1 && (
            <div className="flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-full border border-primary-200">
              <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
              <span className="text-xs font-semibold text-primary-700">Mínimo {minNights} noites</span>
            </div>
          )}
        </div>
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

        {/* Message Display */}
        {message && (
          <div className={`
            mb-3 p-3 rounded-lg text-sm text-center transition-all
            ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : ''}
            ${message.type === 'info' ? 'bg-blue-50 text-blue-700 border border-blue-200' : ''}
            ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : ''}
          `}>
            {message.text}
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-100 border border-green-300" />
            <span className="text-xs text-gray-600">Livre</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-100 border border-red-300" />
            <span className="text-xs text-gray-600">Ocupado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-primary-50 border border-primary-300" />
            <span className="text-xs text-gray-600">Hoje</span>
          </div>
          {minNights > 1 && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300" />
              <span className="text-xs text-gray-600">Mín. {minNights} noites</span>
            </div>
          )}
          {(selectedStartDate || selectedEndDate) && (
            <>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-primary-500 border border-primary-600 shadow-sm" />
                <span className="text-xs text-gray-600">
                  {selectedStartDate && selectedEndDate 
                    ? `${selectedStartDate.getDate()}/${selectedStartDate.getMonth() + 1} - ${selectedEndDate.getDate()}/${selectedEndDate.getMonth() + 1}`
                    : selectedStartDate 
                    ? `Check-in: ${selectedStartDate.getDate()}/${selectedStartDate.getMonth() + 1}`
                    : ''
                  }
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedStartDate(null);
                  setSelectedEndDate(null);
                  setMessage({ type: 'info', text: 'Seleção limpa.' });
                  setTimeout(() => setMessage(null), 2000);
                  if (onDateSelection) {
                    onDateSelection('', '', false);
                  }
                }}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                title="Limpar seleção"
              >
                ✕ Limpar
              </button>
            </>
          )}
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
