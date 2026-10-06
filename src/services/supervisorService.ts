import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DailyInspectionReport, AttendanceCode, InspectionItem } from '../types';

/**
 * Operations Schema Row Definitions for Supabase PostgreSQL
 */
export interface SupabaseSupervisorInspectionRow {
  id?: string;
  day: number;
  date?: string;
  items: InspectionItem[];
  supervisor_name?: string;
  verified_by_admin?: string;
  admin_comments?: string;
  is_submitted?: boolean;
  is_verified?: boolean;
  submitted_at?: string | null;
  verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseStaffAttendanceRow {
  id?: string;
  staff_sr_no: number;
  day: number;
  attendance_code: AttendanceCode;
  marked_by?: string;
  marked_at?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Returns a Supabase client configured for the 'operations' schema
 */
export function getOperationsClient() {
  return supabase.schema('operations');
}

/**
 * Fetches the daily 33-point inspection checklist and verification status
 * for a specific day from operations.supervisor_inspections
 */
export async function fetchInspectionByDay(day: number): Promise<DailyInspectionReport | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  try {
    const { data, error } = await getOperationsClient()
      .from('supervisor_inspections')
      .select('*')
      .eq('day', day)
      .maybeSingle();

    if (error) {
      console.warn(`[Supabase operations] Error fetching inspection for day ${day}:`, error);
      return null;
    }

    if (!data) {
      return null;
    }

    const report: DailyInspectionReport = {
      day: data.day,
      date: data.date || new Date().toISOString().split('T')[0],
      items: Array.isArray(data.items) ? data.items : [],
      supervisorName: data.supervisor_name || 'Parvez (Facility Supervisor)',
      verifiedByAdmin: data.verified_by_admin || '',
      adminComments: data.admin_comments || '',
      isSubmitted: Boolean(data.is_submitted),
      isVerified: Boolean(data.is_verified),
      submittedAt: data.submitted_at || undefined,
      verifiedAt: data.verified_at || undefined,
    };

    return report;
  } catch (err: any) {
    console.warn(`[Supabase operations] Exception fetching inspection for day ${day}:`, err);
    return null;
  }
}

/**
 * Upserts daily inspection report (items JSON, submission, and admin verification status)
 * into operations.supervisor_inspections
 */
export async function saveInspection(report: DailyInspectionReport): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const payload = {
      day: report.day,
      date: report.date,
      items: report.items,
      supervisor_name: report.supervisorName,
      verified_by_admin: report.verifiedByAdmin,
      admin_comments: report.adminComments,
      is_submitted: report.isSubmitted,
      is_verified: report.isVerified,
      submitted_at: report.submittedAt || null,
      verified_at: report.verifiedAt || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await getOperationsClient()
      .from('supervisor_inspections')
      .upsert(payload, { onConflict: 'day' })
      .select();

    if (error) {
      console.warn(`[Supabase operations] Error saving inspection for day ${report.day}:`, error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.warn(`[Supabase operations] Exception saving inspection for day ${report.day}:`, err);
    return { success: false, error: err?.message || 'Failed to save inspection' };
  }
}

/**
 * Fetches all attendance records for a specific day from operations.staff_attendance
 */
export async function fetchAttendanceByDay(day: number): Promise<Record<number, AttendanceCode>> {
  if (!isSupabaseConfigured) {
    return {};
  }

  try {
    const { data, error } = await getOperationsClient()
      .from('staff_attendance')
      .select('staff_sr_no, attendance_code')
      .eq('day', day);

    if (error) {
      console.warn(`[Supabase operations] Error fetching attendance for day ${day}:`, error);
      return {};
    }

    const attendanceMap: Record<number, AttendanceCode> = {};
    if (data && Array.isArray(data)) {
      data.forEach((row: any) => {
        if (typeof row.staff_sr_no === 'number') {
          attendanceMap[row.staff_sr_no] = row.attendance_code as AttendanceCode;
        }
      });
    }

    return attendanceMap;
  } catch (err: any) {
    console.warn(`[Supabase operations] Exception fetching attendance for day ${day}:`, err);
    return {};
  }
}

/**
 * Upserts a single staff member's attendance record in operations.staff_attendance
 */
export async function updateStaffAttendance(
  staffSrNo: number,
  day: number,
  code: AttendanceCode,
  markedBy?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const payload = {
      staff_sr_no: staffSrNo,
      day,
      attendance_code: code,
      marked_by: markedBy || 'Supervisor Parvez',
      marked_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await getOperationsClient()
      .from('staff_attendance')
      .upsert(payload, { onConflict: 'staff_sr_no,day' });

    if (error) {
      console.warn(`[Supabase operations] Error updating attendance for staff #${staffSrNo} day ${day}:`, error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn(`[Supabase operations] Exception updating attendance for staff #${staffSrNo} day ${day}:`, err);
    return { success: false, error: err?.message || 'Failed to update attendance' };
  }
}

/**
 * Bulk upserts attendance records for multiple staff members for a specific day
 */
export async function bulkMarkAttendance(
  day: number,
  staffSrNos: number[],
  code: AttendanceCode,
  markedBy?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const now = new Date().toISOString();
    const rows = staffSrNos.map((srNo) => ({
      staff_sr_no: srNo,
      day,
      attendance_code: code,
      marked_by: markedBy || 'Supervisor Parvez',
      marked_at: now,
      updated_at: now,
    }));

    const { error } = await getOperationsClient()
      .from('staff_attendance')
      .upsert(rows, { onConflict: 'staff_sr_no,day' });

    if (error) {
      console.warn(`[Supabase operations] Error bulk updating attendance for day ${day}:`, error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn(`[Supabase operations] Exception bulk updating attendance for day ${day}:`, err);
    return { success: false, error: err?.message || 'Failed to bulk update attendance' };
  }
}
