import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import {Button} from 'antd';
import Modal from '@/components/Modal/index';
import api from '@/lib/common/api';

const Actions = () => {
  const router = useRouter();
  const [isSubmitting, setSubmittingState] = useState(false);
  const [name, setName] = useState('');
  const [showModal, setModalState] = useState(false);
  const validName = name.length > 0 && name.length <= 16;

  const createWorkspace = (event) => {
    event.preventDefault();
    setSubmittingState(true);
    api('/api/workspace', {
      body: { name },
      method: 'POST',
    }).then((response) => {
      setSubmittingState(false);

      if (response.errors) {
        Object.keys(response.errors).forEach((error) =>
          toast.error(response.errors[error].msg)
        );
      } else {
        toggleModal();
        setName('');
        toast.success('Workspace successfully created!');
      }
    });
  };

  const handleNameChange = (event) => setName(event.target.value);

  const handleWorkspaceChange = (workspace) => {
    setWorkspace(workspace);
    router.replace(`/account/${workspace?.slug}`);
  };

  const toggleModal = () => setModalState(!showModal);

  return (
    <div className="flex flex-col items-stretch justify-center px-5 space-y-3">
      <Button
        onClick={toggleModal}
        type="primary"
      >
        <PlusIcon className="w-5 h-5 text-white" aria-hidden="true" />
        Create Workspace
      </Button>
      <Modal show={showModal} title="Create a Workspace" toggle={toggleModal}>
        <div className="space-y-0 text-sm text-gray-600">
          <p>
            Create a workspace to keep your team&apos;s content in one place.
          </p>
          <p>You&apos;ll be able to invite everyone later!</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold">Workspace Name</h3>
          <p className="text-sm text-gray-400">
            Name your workspace. Keep it simple.
          </p>
          <input
            className="w-full px-3 py-2 border rounded"
            disabled={isSubmitting}
            onChange={handleNameChange}
            type="text"
            value={name}
          />
        </div>
        <div className="flex flex-col items-stretch">
          <Button
            className="text-white bg-blue-600 hover:bg-blue-500"
            disabled={!validName || isSubmitting}
            onClick={createWorkspace}
          >
            <span>Create Workspace</span>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Actions;
