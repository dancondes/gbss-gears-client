import React from 'react';
import Modal from './modals/Modal';
import useTipModalStore from '@/store/tip-modal-store';
import { loginTips } from '@/constants/login-tips';

function TipModal() {
    const { isOpen, currentTipIndex, dontShowAgain, closeModal, setDontShowAgain, nextTip } = useTipModalStore();

    const currentTip = loginTips[currentTipIndex];

    function handleClose() {
        nextTip(loginTips.length);
        closeModal();
    }

    function handleNextTip() {
        nextTip(loginTips.length);
    }

    function handleCheckboxChange(e) {
        setDontShowAgain(e.target.checked);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Quick Tip"
            size="lg"
            closeOnBackdropClick={false}
        >
            <div className="space-y-4">
                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                    <h3 className="font-semibold text-gray-900 mb-2">
                        {currentTip?.title}
                    </h3>
                    <p className="text-gray-700">
                        {currentTip?.content}
                    </p>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="dontShowAgain"
                        checked={dontShowAgain}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label
                        htmlFor="dontShowAgain"
                        className="text-sm text-gray-700 cursor-pointer"
                    >
                        Don&apos;t show this for 7 days
                    </label>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        Tip {currentTipIndex + 1} of {loginTips.length}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleNextTip}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors cursor-pointer"
                        >
                            Next Tip
                        </button>
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-dark-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors cursor-pointer"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default TipModal;
