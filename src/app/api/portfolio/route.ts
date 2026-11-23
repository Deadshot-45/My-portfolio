import { NextResponse } from 'next/server';
import { getPortfolioData } from '@/lib/portfolioServer';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: unknown) {
    console.error('[API/portfolio] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load portfolio data' },
      { status: 500 }
    );
  }
}
