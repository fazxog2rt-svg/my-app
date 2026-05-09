import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const twoFactorData: any[] = [];

function generateBackupCodes() {
  return Array.from({ length: 8 }, () =>
    Math.random().toString(36).substr(2, 6).toUpperCase()
  );
}

function generateSecret() {
  return 'JBSWY3DP' + Math.random().toString(36).substr(2, 20).toUpperCase();
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action, method, code, backupCode } = await request.json();

  let twoFactor = twoFactorData.find(t => t.userId === session.user?.email);

  if (action === 'setup') {
    if (!twoFactor) {
      twoFactor = {
        userId: session.user?.email,
        enabled: false,
        secret: generateSecret(),
        backupCodes: generateBackupCodes(),
        method: method || 'email',
        createdAt: new Date(),
      };
      twoFactorData.push(twoFactor);
    }

    return NextResponse.json({
      success: true,
      secret: twoFactor.secret,
      backupCodes: twoFactor.backupCodes,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${twoFactor.secret}`,
      message: 'Scan QR code with Google Authenticator or Authy',
    });
  }

  if (action === 'verify') {
    if (!twoFactor) {
      return NextResponse.json({ error: '2FA not configured' }, { status: 400 });
    }

    // Mock verification - in real app would verify TOTP code
    if (code !== '000000' && code !== twoFactor.secret.slice(0, 6)) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    twoFactor.enabled = true;

    return NextResponse.json({
      success: true,
      enabled: true,
      message: '2FA enabled successfully',
    });
  }

  if (action === 'verify-backup' && backupCode) {
    if (!twoFactor || !twoFactor.enabled) {
      return NextResponse.json({ error: '2FA not enabled' }, { status: 400 });
    }

    const codeIndex = twoFactor.backupCodes.indexOf(backupCode);
    if (codeIndex === -1) {
      return NextResponse.json({ error: 'Invalid backup code' }, { status: 400 });
    }

    // Remove used backup code
    twoFactor.backupCodes.splice(codeIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Backup code verified',
      remainingCodes: twoFactor.backupCodes.length,
    });
  }

  if (action === 'disable') {
    if (twoFactor) {
      twoFactor.enabled = false;
      twoFactor.secret = undefined;
    }

    return NextResponse.json({
      success: true,
      enabled: false,
      message: '2FA has been disabled',
    });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const twoFactor = twoFactorData.find(t => t.userId === session.user?.email);

  return NextResponse.json({
    success: true,
    enabled: twoFactor?.enabled || false,
    method: twoFactor?.method || 'email',
    backupCodesRemaining: twoFactor?.backupCodes?.length || 0,
  });
}
